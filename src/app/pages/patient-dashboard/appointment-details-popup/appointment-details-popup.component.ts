// appointment-details-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appointment-details-popup',
  templateUrl: 'appointment-details-popup.component.html',
  styleUrls: ['appointment-details-popup.component.css']
})
export class AppointmentDetailsPopup {
  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsPopup>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
  cancel(appointmentId: string){
    if(confirm('dummy cancel req')){
     this.patientService.cancelAppointment(this.data.appoinmentId).subscribe(
      (response)=>{
        alert(response.message)
      },
      (error) => {
        alert(error.message)
      }
     );
    }
  }
  resh(appointmentId: string){
    if(confirm('dummy reschedule req')){
      alert('dummy rescheduled')
    }
  }
}
