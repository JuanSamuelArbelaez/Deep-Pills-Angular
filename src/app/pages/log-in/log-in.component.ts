import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
})
export class LogIn {
  constructor(private title: Title, private meta: Meta, private authService: AuthenticationService, private tokenService: TokenService, private router: Router) {
    this.title.setTitle('Log In - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Log In - Deep Pills',
      },
    ])
  }
  
  onLogin(email: string, password: string): void {
    console.log('Serving logging');

    if (this.tokenService.isLogged()) {
      console.log('Token already authenticated. Redirecting to dashboard');
      this.router.navigate(['/patient-dashboard']);
      return;
    }

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful', response);

        this.tokenService.setToken(response.message.token);

        const userInfo = this.tokenService.login(response.message.token);

        console.log('User Info:', userInfo);

        switch (userInfo.role) {
          case 'patient':
            console.log('Redirecting to dashboard', response.message.token);
            alert('Redirecting to dashboard');
            this.router.navigate(['/patient-dashboard']);
            break;
          default:
            alert('Unsupported Role: '+ userInfo.role);
            console.error('Unsupported Role:', userInfo.role);
        }
      },
      (error) => {
        alert('Login error: '+error.error.message);
        console.error('Login error: ', error.error.message);
      }
    );
}
}
