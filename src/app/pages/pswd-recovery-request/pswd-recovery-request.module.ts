import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { PswdRecoveryRequest } from './pswd-recovery-request.component'

const routes = [
  {
    path: '',
    component: PswdRecoveryRequest,
  },
]

@NgModule({
  declarations: [PswdRecoveryRequest],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [PswdRecoveryRequest],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PswdRecoveryRequestModule {}
