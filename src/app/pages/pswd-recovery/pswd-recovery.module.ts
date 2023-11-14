import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from '../../components/components.module'
import { PswdRecovery } from './pswd-recovery.component'
import { FormsModule } from '@angular/forms'

const routes = [
  {
    path: '',
    component: PswdRecovery,
  },
]

@NgModule({
  declarations: [PswdRecovery],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes), FormsModule],
  exports: [PswdRecovery],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PswdRecoveryModule {}
