import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { RegistrationService } from 'src/app/services/registration.service'
import { TokenService } from 'src/app/services/token.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home {
  raw3ezg: string = ' '
  raweyu2: string = ' '
  constructor(private title: Title, private meta: Meta, private registrationService: RegistrationService, private authService: AuthenticationService, private tokenService: TokenService, private router: Router) {
    this.title.setTitle('Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Deep Pills',
      },
    ])
  }

  onRegister(email: string, personalId: string,  password: string, passwordConfirm: string): void {
    if(email.length<1){
      console.log('Fill your email address');
      alert('Fill your email address');
      return;
    }

    if(personalId.length<1){
      console.log('Fill your personal Id');
      alert('Fill your personal Id');
      return;
    }
    
    if(password.length<1){
      console.log('Fill your password');
      alert('Fill your password');
      return;
    }

    if(password != passwordConfirm){
      console.log('Passwords do not match.');
      alert('Passwords do not match.');
      return;
    }
    
    this.registrationService.register({email, personalId, password}).subscribe(
      (response) => {
        console.log('Registration successful, redirecting to auth.', response);
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('Auth successful', response);

            this.tokenService.setToken(response.message.token);

            const userInfo = this.tokenService.login(response.message.token)
            
            switch (userInfo.role) {
              case 'patient':
                alert('Loggin Succesfull: redirecting to DashBoard');
                console.log('to dashboard', response.message.token);
                this.router.navigate(['/patient-dashboard']);
                break;
              default:
                  console.error('Unsoported Role:', userInfo.role);
                  alert('Unsoported Role:'+userInfo.role);
            }
          },
          (error) => {
            alert('Auth error'+error.error.message);
            console.error('Auth error', error.error.message);
          }
        );
      },
      (error) => {
        alert('Registration error'+error.error.message);
        console.error('Registration error', error.error.message);
      }
    );
  }
}
