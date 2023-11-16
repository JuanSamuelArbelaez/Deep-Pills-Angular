// patient-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { InfoLoadPatientDTO } from '../../models/model-dto';
import { InfoUpdatePatientDTO } from '../../models/model-dto';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EnumsService } from 'src/app/services/enums.service';

@Component({
  selector: 'patient-dashboard',
  templateUrl: 'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css'],
})
export class PatientDashboard implements OnInit {
  cities: string[]; 
  epsValues: string[]; 
  bloodTypeValues: string[];
  alergyValues: string[];
  patientAlergies: string[];
  selectedCity: string;
  selectedEps: string;
  selectedBloodType: string;
  selectedAllergy: string;

  updateForm: FormGroup;
  selectedDate: Date;
  originalFormValue: any

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private tokenService: TokenService,
    private enums: EnumsService,
    private router: Router
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

    this.loadPatientInfo();
  }

  loadPatientInfo() {
    console.log('Loading patient information...');
  
    if (this.tokenService.isLogged() === false) {
      console.error('Not authenticated. Redirecting to Log-in in');
      alert('Not authenticated. Redirecting to Log-in');
      this.router.navigate(['/log-in']);
      return;
    }
  
    const patientId = this.tokenService.getUserId();
  
    this.patientService.loadPatientInfo(patientId).subscribe(
      (data) => {
        const patientInfo = data.message;
        console.log('Patient information loaded successfully:', patientInfo);
        console.log(patientInfo);
        console.dir(patientInfo);
  
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
      },
      (error) => {
        console.error('Error al cargar la información del paciente', error);
      }
    );
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

      // Envia solo los campos modificados al servicio
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
    const index = this.patientAlergies.indexOf(alergy);

    if (index !== -1) {
      // La alergia está presente en la lista, eliminarla
      this.patientAlergies.splice(index, 1);
    } else {
      // La alergia no está presente en la lista, agregarla
      this.patientAlergies.push(alergy);
    }
  }
}

