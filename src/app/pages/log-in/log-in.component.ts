import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
})
export class LogIn {
  constructor(private title: Title, private meta: Meta, private authService: AuthenticationService) {
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
        // Manejar la respuesta exitosa aquí
        console.log('Login successful', response);
      },
      (error) => {
        // Manejar el error aquí
        console.error('Login error', error);
      }
    );
  }
}
