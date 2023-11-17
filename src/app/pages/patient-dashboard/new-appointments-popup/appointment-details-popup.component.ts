// appointment-details-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-details-popup',
  templateUrl: 'appointment-details-popup.component.html',
  styleUrls: ['appointment-details-popup.component.css']
})
export class AppointmentDetailsPopup {
  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
