import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../../components/components.module';
import { ClaimsPopup as ClaimsPopup } from './claims-popup.component'

const routes = [
    {
      path: '',
      component: ClaimsPopup,
    },
  ]
  
  @NgModule({
    declarations: [ClaimsPopup],
    imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
    exports: [ClaimsPopup],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class ClaimsPopupModule {}