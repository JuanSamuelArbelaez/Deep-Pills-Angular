import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../../components/components.module';
import { AppointmentDetailsPopup } from './appointment-details-popup.component'

const routes = [
    {
      path: '',
      component: AppointmentDetailsPopup,
    },
  ]
  
  @NgModule({
    declarations: [AppointmentDetailsPopup],
    imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
    exports: [AppointmentDetailsPopup],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class AppointmentDetailsPopupModule {}