import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../components/components.module'
import { PatientDashboard } from './patient-dashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: PatientDashboard,
  },
]

@NgModule({
  declarations: [PatientDashboard],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [PatientDashboard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientDashboardModule {}
