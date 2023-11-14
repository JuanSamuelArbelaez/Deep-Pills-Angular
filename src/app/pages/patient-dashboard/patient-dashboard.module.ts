import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../components/components.module'
import { PatientDashboard } from './patient-dashboard.component'
import { ClaimsComponent } from './claims/claims.component'
import { MembershipsComponent } from './memberships/memberships.component'
import { AppointmentsComponent } from './appointments/appointments.component'
import { ProfileComponent } from './profile/profile.component'


const routes = [
  {
    path: '',
    component: PatientDashboard,
    redirectTo: '',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'claims',
    component: ClaimsComponent,
  },
  {
    path: 'memberships',
    component: MembershipsComponent,
  },
]

@NgModule({
  declarations: [PatientDashboard],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [PatientDashboard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientDashboardModule {}
