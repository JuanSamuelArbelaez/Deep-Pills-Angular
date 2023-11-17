// patient-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { InfoUpdatePatientDTO } from '../../models/model-dto';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EnumsService } from 'src/app/services/enums.service';
import { AppointmentDetailsPopup } from './appointment-details-popup/appointment-details-popup.component'

@Component({
  selector: 'patient-dashboard',
  templateUrl: 'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css'],
})
export class PatientDashboard implements OnInit {
  holderName: string = "Holder-Name";

  cities: string[]; 
  epsValues: string[]; 
  bloodTypeValues: string[];
  alergyValues: string[];
  patientAlergies: string[] = [];
  selectedCity: string;
  selectedEps: string;
  selectedBloodType: string;
  selectedAllergy: string;

  updateForm: FormGroup;
  selectedDate: Date;
  originalFormValue: any

  loadingAppointments: boolean = false;
  appointments: any[]

  patientPID: string = ""

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private patientService: PatientService,
    private tokenService: TokenService,
    private enums: EnumsService,
    private router: Router,
  ) {
    console.log('PatientDashboard component constructor');
    this.updateForm = this.fb.group({
      name: new FormControl(),
      lastName: new FormControl(),
      dateOfBirth: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      city: new FormControl(),
      pic: new FormControl(),
      bloodType: new FormControl(),
      eps: new FormControl(),
    });
}

  ngOnInit() {
    console.log('PatientDashboard component ngOnInit');

    this.enums.getEnumValues('City').subscribe(
      (message) => {
        console.log('City loaded');
        this.cities = message.message;
      },
      (error) => {
        console.error('Error al obtener los valores de City', error);
      }
    );

    this.enums.getEnumValues('EPS').subscribe(
      (message) => {
        console.log('EPS loaded');
        this.epsValues = message.message;
      },
      (error) => {
        console.error('Error al obtener los valores de EPS', error);
      }
    );

    this.enums.getEnumValues('BloodType').subscribe(
      (message) => {
        console.log('BloodType loaded')
        this.bloodTypeValues = message.message;
      },
      (error) => {
        console.error('Error al obtener los valores de BloodType', error);
      }
    );

    this.enums.getEnumValues('Allergy').subscribe(
      (message) => {
        console.log('Allergy loaded')
        this.alergyValues = message.message;
      },
      (error) => {
        console.error('Error al obtener los valores de Allergy', error);
      }
    );

    this.loadPatientAndAppointments()
  }
  
  private async loadPatientAndAppointments() {
    await this.loadPatientInfo();
    console.log("Now proceeding to load appointments...");
    this.loadAppointments('upcoming');
  }

  async loadPatientInfo() {
    console.log('Loading patient information...');
  
    if (this.tokenService.isLogged() === false) {
      console.error('Not authenticated. Redirecting to Log-in in');
      alert('Not authenticated. Redirecting to Log-in');
      this.router.navigate(['/log-in']);
      return;
    }
  
    const patientId = this.tokenService.getUserId();
  
    try{
      const data = await this.patientService.loadPatientInfo(patientId).toPromise();
      const patientInfo = data.message;
      console.log('Patient information loaded successfully:', patientInfo);
      console.log(patientInfo);
      this.patientPID = patientInfo.patientPersonalId
      console.log("PID (prof): "+patientInfo.patientPersonalId+"->"+this.patientPID)
  
        // Utiliza patchValue o setValue para actualizar el formulario
      this.updateForm.patchValue({
        name: patientInfo.name,
        lastName: patientInfo.lastName,
        dateOfBirth: patientInfo.dateOfBirth,
        phone: patientInfo.phone,
        email: patientInfo.email,
        city: patientInfo.city,
        pic: patientInfo.pictureUrl,
        bloodType: patientInfo.bloodType,
        eps: patientInfo.eps,
      });

      this.patientAlergies = patientInfo.allergies;
  
        // Guarda el valor original del formulario
      this.originalFormValue = this.updateForm.value;
  
      console.log('Form values after patching:', this.updateForm.value, this.patientAlergies);
    }
    catch (error){
      console.error('Error al cargar la información del paciente', error);
    }
    console.log('Form values after patching:', this.updateForm.value, this.patientAlergies);
  }
  
  updatePatientInfo() {
    if (this.updateForm.valid) {
      // Crea un objeto con solo los campos modificados
      const modifiedData: InfoUpdatePatientDTO = {
        id: this.tokenService.getUserId(),
        name: this.updateForm.value.name ?? null,
        lastName: this.updateForm.value.lastName ?? null,
        dateOfBirth: this.updateForm.value.dateOfBirth ?? null,
        phone: this.updateForm.value.phone ?? null,
        email: this.updateForm.value.email ?? null,
        city: this.updateForm.value.city ?? null,
        pic: this.updateForm.value.pic ?? null,
        bloodType: this.updateForm.value.bloodType ?? null,
        eps: this.updateForm.value.eps ?? null,
        allergies: this.patientAlergies,
      };
      console.log(modifiedData)

      this.patientService.updatePatientInfo(modifiedData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error al actualizar la información del paciente', error);
        }
      );
    } else {
      // El formulario no es válido, realiza las acciones necesarias
    }
  }

  toggleAlergy(alergy: string) {
    if (this.patientAlergies) {
      const index = this.patientAlergies.indexOf(alergy);
  
      if (index !== -1) {
        this.patientAlergies.splice(index, 1);
      } else {
        this.patientAlergies.push(alergy);
      }
    }
  }

  loadAppointments(option: string) {
    console.log("Loading "+option+" appointments...")
    let serviceFunction;
    switch (option) {
      case 'all':
        serviceFunction = this.patientService.getAllAppointments;
        break;
      case 'upcoming':
        serviceFunction = this.patientService.getUpcomingAppointments;
        break;
      case 'past':
        serviceFunction = this.patientService.getPastAppointments;
        break;
    }
    console.log("waiting for pid...")
    if (serviceFunction) {
      serviceFunction.call(this.patientService, this.patientPID).subscribe(
        (response) => {
          this.loadingAppointments = false;
          this.appointments = response.message;
          console.log(response.message);
        },
        (error) => {
          console.error('Error while loading the appointments', error);
        }
      );
    } else {
      console.error('Invalid option for loading appointments');
    }
  }

  getAppointmentDetails(appointmentId: number) {
    this.patientService.getAppointmentDetails(appointmentId).subscribe(
      (response) => {
        this.openAppointmentDetailsPopup(response.message);
      },
      (error) => {
        console.error('Error al obtener los detalles de la cita', error);
      }
    );
  }
  
  openAppointmentDetailsPopup(details: any) {
    const dialogRef = this.dialog.open(AppointmentDetailsPopup, {
      data: details,
      width: '500px',
    });
  }
  createNewAppointment() {
  }

  logout(){
    this.tokenService.logout()
    this.router.navigate(['/log-in']);
    console.log('Logging out...');
  }
}

