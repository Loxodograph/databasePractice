import { Component, input } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../services/user-profile';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
    userName: string = "";
    password: string= "";

    constructor(private router: Router, public userProfile: UserProfile) {}
    
    onSubmit() {
      this.userProfile.userDetails.getValue().userName = this.userName;
      this.userProfile.userDetails.getValue().passwordHash
      this.router.navigate(["/transactions"]);
    }

    goToSignUp() {
      this.router.navigate(['/signUp']);
    }
  
 }
