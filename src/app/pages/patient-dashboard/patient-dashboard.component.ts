// patient-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { AppointmentDatePatientSearchDTO, AppointmentDetailsDTO, AppointmentScheduleDTO, ClaimDetailedItemPatientDTO, ClaimSearchDTO, HourSearchDTO, InfoUpdatePatientDTO, PhysicianSearchDTO } from '../../models/model-dto';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EnumsService } from 'src/app/services/enums.service';


@Component({
  selector: 'patient-dashboard',
  templateUrl: 'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css'],
})
export class PatientDashboard implements OnInit {
  holderName: string = "Holder-Name";

  dp: any;
  date: any;

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
  appointmentData: AppointmentDetailsDTO = {
    "appointmentId": 0,
    "patientPersonalId": "",
    "date": new Date(),
    "time": new Date(),
    "location": "",
    "duration": 0,
    "requestTime": new Date(),
    "detailedReasons": "",
    "doctorsNotes": "",
    "appointmentState": "",
    "claims": [],
    "treatments": [],
    "emailsIds": [],
    "physicianInfo": {
        "physicianId": 0,
        "name": "",
        "lastName": ""
    },
    "symptoms": []
  }

  dateSelect: any[]
  timeSelect: any[]
  selectedSchedule: string = ""
  selectedAppTime: string = "" 
  physicians: any
  selectedPhysician: any
  reasons: string

  specs: any[]
  selectedSpecs: any

  loadingClaims: boolean = false;
  claims: any[]
  claimData: any = {}

  patientPID: string = ""

  constructor(
    private dialog: MatDialog,
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

    this.enums.getEnumValues('Specialization').subscribe(
      (message) => {
        console.log('Specializations loaded')
        this.specs = message.message;
      },
      (error) => {
        console.error('Error al obtener los valores de Specialization', error);
      }
    );

    this.loadWindow()
  }
  
  private async loadWindow() {
    await this.loadPatientInfo();
    console.log("Now proceeding to load appointments...");
    this.loadAppointments('upcoming');
    this.loadClaims()
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
      this.holderName = patientInfo.name
      console.log('Patient information loaded successfully:', patientInfo);
      console.log(patientInfo);
      this.patientPID = patientInfo.patientPersonalId
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

  async loadAppointments(option: string) {
    console.log("Loading " + option + " appointments...");
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
      case 'onDate':
        serviceFunction = this.patientService.getDateAppointments;
        break;
    }
    if (serviceFunction) {
      if (option === 'onDate') {
        const inputDate = await this.askForDate(); // Esperar a que se complete askForDate
        console.log(inputDate)
        serviceFunction.call(this.patientService,{
          patientPersonalId: this.patientPID,
          date: inputDate.toISOString().slice(0, 10) // Tomar solo la parte de la fecha
        } 
          ).subscribe(
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
      }
    } else {
      console.error('Invalid option for loading appointments');
    }
  }
  
  askForDate(): Promise<Date> {
    return new Promise((resolve) => {
      const date = '';
      while (true) {
        const yearInput = prompt('Ingrese el año:');
        if (yearInput === null) {
          // Si el usuario presiona Cancelar, salir del bucle
          break;
        }
  
        // Solicitar mes
        const monthInput = prompt('Ingrese el mes:');
        if (monthInput === null) {
          // Si el usuario presiona Cancelar, salir del bucle
          break;
        }
  
        // Solicitar día
        const dayInput = prompt('Ingrese el día:');
        if (dayInput === null) {
          // Si el usuario presiona Cancelar, salir del bucle
          break;
        }
  
        // Validar el formato de la fecha
        const inputDate = new Date(`${yearInput}-${monthInput}-${dayInput}`);
        inputDate.setDate(inputDate.getDate()+1)
        if (isNaN(inputDate.getTime())) {
          alert('Formato de fecha inválido. Por favor, inténtelo de nuevo.');
          continue; // Reiniciar el bucle para solicitar la fecha nuevamente
        }
  
        // Confirmar la fecha ingresada
        const confirmation = confirm(`¿Es correcta la fecha ingresada?\n${inputDate.toDateString()}`);
        if (confirmation) {
          resolve(inputDate); // Resuelve la promesa con la fecha
          break;
        } else {
          // El usuario no confirmó la fecha, reiniciar el bucle
          continue;
        }
      }
    });
  }
  

  getAppointmentDetails(appointmentId: number) {
    this.patientService.getAppointmentDetails(appointmentId).subscribe(
      (response) => {
        this.appointmentData = response.message
        console.log("app loaded: ",response)
      },
      (error) => {
        console.error('Error al obtener los detalles de la cita', error);
      }
    );
  }

  

  logout(){
    this.tokenService.logout()
    this.router.navigate(['/log-in']);
    console.log('Logging out...');
  }

  loadClaims() {
    this.loadingClaims = true;
    this.patientService.listAllClaims(this.patientPID).subscribe(
      (response) => {
        this.loadingClaims = false
        this.claims = response.message;
        console.log(response.message);
      },
      (error) => {
        // Manejar el error si es necesario
      },
      () => {
        this.loadingClaims = false;
      }
    );
  }
  viewClaimDetails(claimId: number){
    this.patientService.seeClaimDetails(new ClaimSearchDTO(claimId, this.patientPID)).subscribe(
      (response) =>{
        this.claimData = response.message
        console.log(this.claimData)
      }, (error)=>{
        alert('Error fetching claim details')
      }
    )
  }
  canSchedule(){
    if (!this.reasons || this.reasons.length<1) return false;
    if (!this.selectedPhysician) return false;
    if (!this.selectedSchedule || this.selectedSchedule.length<1) return false;
    if (!this.selectedAppTime || this.selectedAppTime.length<1) return false
    return true;
  }
  selectPhysician(physicianId: number) {
    this.selectedPhysician = physicianId;
    this.patientService.getPhysicianSchedules(physicianId).subscribe(
      (response) => {
        this.dateSelect = response.message
        console.log(this.dateSelect);
      },
      (error) => {
        alert('Error fetching physician schedules: ' + error.message);
      }
    );
  }
  
  setSelectedSpec(spec: string){
    this.selectedSpecs = spec
  }
  searchPhysicians(){
    this.patientService.listPhysicians(new PhysicianSearchDTO(6, this.selectedSpecs)).subscribe(
      (response) =>{
        this.physicians = response.message
        console.log(this.physicians)
      }, (error)=>{
        alert('Error fetching physicians: '+error.message)
      }
    )
  }
  ale(){
    alert("creating new...")
  }
  selectDate(date: any){
    this.selectedSchedule = date
  }
  loadHours(){
    let scheduleId = Number(String(this.selectedSchedule).split(' ')[0])
    this.patientService.getHours(new HourSearchDTO(this.selectedPhysician, scheduleId)).subscribe(
      (response) =>{
        this.timeSelect = response.message
        console.log(this.timeSelect)
      }, (error)=>{
        alert('Error fetching physicians: '+error.message)
      }
    )
  }
  selectHour(hour: any){
    console.log(hour)
    alert(hour)

  }
  schedule() {
    if(confirm('Do you wish to schedule this appointment?')){
    let scheduleId = Number(String(this.selectedSchedule).split(' ')[0]);
    let fechaDefault = new Date()  // Fecha por defecto (epoch time)
    let [horas, minutos, segundos] = this.selectedAppTime.split(" ")[0].split(':').map(Number);
    fechaDefault.setHours(horas, minutos, segundos);
    console.log(this.selectedAppTime.split(" ")[0].split(':').map(Number))
    console.log(fechaDefault)
    let formatted = fechaDefault.toISOString();

    console.log(formatted); 
    let dto = new AppointmentScheduleDTO(this.tokenService.getUserId(), this.selectedPhysician, this.reasons, scheduleId, formatted)
    console.log(dto)
    this.patientService.scheduleAppointment(dto).subscribe(
      (response) =>{
        console.log(response.message)
        alert(response.message)
      }, (error)=>{
        console.log(error.message)
        alert(error.message)
      }
    )
    }
  }
  cancel(appointmentId: number){
    if(confirm('Do you wish to cancel this appointment?\nThis action cannot be undone.')){
     this.patientService.cancelAppointment(appointmentId).subscribe(
      (response)=>{
        alert(response.message)
      },
      (error) => {
        alert(error.message)
      }
     );
    }
  }
  resh(appointmentId: number){
    if(confirm('Do you wish to reschedule this appointment?')){
      alert("Service not up now")
     }
  }
}


