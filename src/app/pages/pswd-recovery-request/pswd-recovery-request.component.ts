import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PasswordRecoveryService } from '../../services/password-recovery.service';

@Component({
  selector: 'pswd-recovery-request',
  templateUrl: 'pswd-recovery-request.component.html',
  styleUrls: ['pswd-recovery-request.component.css'],
})
export class PswdRecoveryRequest {
  constructor(private title: Title, private meta: Meta, private pswdService: PasswordRecoveryService) {
    this.title.setTitle('PswdRecoveryRequest - Deep Pills');
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PswdRecoveryRequest - Deep Pills',
      },
    ]);
  }

  handlePasswordRecovery(email: string): void {
    console.log("Serving... ", email);
    this.pswdService.requestPasswordRecovery(email).subscribe(
      response => {
        console.log(response.message);
        alert(response.message);
  
        // Check if there's a redirect URL in the response
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      },
      error => {
        console.error('Password recovery failed:', error);
        alert(error.message);
      }
    );
  }
}
