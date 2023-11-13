import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { PatientDashboard } from './patient-dashboard.component'

const routes = [
  {
    path: '',
    component: PatientDashboard,
  },
]

@NgModule({
  declarations: [PatientDashboard],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [PatientDashboard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientDashboardModule {}
