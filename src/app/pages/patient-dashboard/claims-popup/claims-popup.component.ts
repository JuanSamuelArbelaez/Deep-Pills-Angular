// appointment-details-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-claims-popup',
  templateUrl: 'claims-popup.component.html',
  styleUrls: ['claims-popup.component.css']
})
export class ClaimsPopup {
  constructor(
    public dialogRef: MatDialogRef<ClaimsPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
