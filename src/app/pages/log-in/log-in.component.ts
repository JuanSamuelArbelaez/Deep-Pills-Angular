import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
})
export class LogIn {
  constructor(private title: Title, private meta: Meta, private authService: AuthenticationService, private router: Router) {
    this.title.setTitle('Log In - Deep Pills')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Log In - Deep Pills',
      },
    ])
  }
  
  onLogin(email: string, password: string): void {
    this.authService.login(email, password).subscribe(
      (response) => {
        // Extraer el token del cuerpo de la respuesta
        const token = response.token;
  
        // Determinar el rol del usuario (patient, physician, admin)
        const userRole = token.role;
  
        // Redirigir a la página correspondiente según el rol
        switch (userRole) {
          case 'patient':
            this.router.navigate(['/patient-dashboard']);
            break;
          case 'physician':
            this.router.navigate(['/physician-dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          default:
            console.error('Unknown role:', userRole);
        }
  
        console.log('Login successful', response);
      },
      (error) => {
        // Manejar el error aquí
        console.error('Login error', error);
      }
    );
  }
}
