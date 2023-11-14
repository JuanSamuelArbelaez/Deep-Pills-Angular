import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../components/components.module';
import { LogIn } from './log-in.component'
import { PatientDashboard } from '../patient-dashboard/patient-dashboard.component';
import { ProfileComponent } from '../patient-dashboard/memberships/memberships.component';

const routes = [
  {
    path: '',
    component: LogIn,
  },
  {
    path: '',
    component: PatientDashboard,
    redirectTo: '/dashboard/profile',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
]

@NgModule({
  declarations: [LogIn],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [LogIn],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class LogInModule {}
