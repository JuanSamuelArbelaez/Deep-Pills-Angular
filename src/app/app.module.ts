import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes = [
  {
    path: 'patient-dashboard',
    loadChildren: () =>
      import('./pages/patient-dashboard/patient-dashboard.module').then(
        (m) => m.PatientDashboardModule
      ),
  },
  {
    path: 'pswd-recovery',
    loadChildren: () =>
      import('./pages/pswd-recovery/pswd-recovery.module').then(
        (m) => m.PswdRecoveryModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./pages/log-in/log-in.module').then((m) => m.LogInModule),
  },
  {
    path: 'pswd-recovery-request',
    loadChildren: () =>
      import('./pages/pswd-recovery-request/pswd-recovery-request.module').then(
        (m) => m.PswdRecoveryRequestModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ComponentsModule, HttpClientModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
