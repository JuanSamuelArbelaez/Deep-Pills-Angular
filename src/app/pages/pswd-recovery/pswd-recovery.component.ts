import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pswd-recovery',
  templateUrl: 'pswd-recovery.component.html',
  styleUrls: ['pswd-recovery.component.css'],
})
export class PswdRecovery implements OnInit {
  @ViewChild('inputField1', { static: true }) inputField1: ElementRef<HTMLInputElement>;
  @ViewChild('inputField2', { static: true }) inputField2: ElementRef<HTMLInputElement>;
  @ViewChild('inputField3', { static: true }) inputField3: ElementRef<HTMLInputElement>;
  @ViewChild('inputField4', { static: true }) inputField4: ElementRef<HTMLInputElement>;
  @ViewChild('inputField5', { static: true }) inputField5: ElementRef<HTMLInputElement>;
  @ViewChild('inputField6', { static: true }) inputField6: ElementRef<HTMLInputElement>;

  get inputFields(): ElementRef<HTMLInputElement>[] {
    return [this.inputField1, this.inputField2, this.inputField3, this.inputField4, this.inputField5, this.inputField6];
  }

  password: string = '';
  confirmPassword: string = '';

  email: string;
  requestId: number;

  constructor(
    private title: Title,
    private meta: Meta,
    private pswdService: PasswordRecoveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title.setTitle('PswdRecoveryRequest - Deep Pills');
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'PswdRecoveryRequest - Deep Pills',
      },
    ]);
  }

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.requestId = +params['id']; 
    });
  }

  // ... (other methods)

  onSubmit(): void {
    // Check if all input fields are completed
    const isFormCompleted = this.inputFields.every((field) => field.nativeElement.value.length === 1);

    // Check if password and confirmPassword match
    const passwordsMatch = this.password === this.confirmPassword;

    if (!isFormCompleted) {
      console.error('Incomplete form');
      alert('Please fill in all the PIN digits.');
      return; // Stop further execution
    }
  
    // Handle password mismatch
    if (!passwordsMatch) {
      console.error('Password mismatch');
      alert('Password and Confirm Password do not match.');
      return; // Stop further execution
    }
  
    // Call the service method
    this.pswdService.acceptPasswordCode({
      passwordRecoveryRequestId: this.requestId,
      email: this.email,
      code: this.inputFields.map((field) => field.nativeElement.value).join('').toUpperCase(),
      password: this.password,
    }).subscribe(
      // Handle the response here
      (response) => {
        // Do something with the response
        console.log(response);
        alert(response.message);
        this.router.navigate(['/log-in']);
      },
      // Handle errors here
      (error) => {
        // Handle error
        console.error(error);
        alert(error.message);
      }
    );
  }
}
