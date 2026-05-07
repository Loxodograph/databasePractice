import { Component, input } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
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
  password: string = "";

  constructor(private router: Router, public userProfile: UserProfile, public authService: AuthService) { }

  onSubmit() {
    const credentials = { username: this.userName, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // 1. Save the token for the interceptor to use later
        localStorage.setItem('token', response.token);

        // 2. Redirect to your protected route
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        alert("Login failed: Invalid username or password");
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/signUp']);
  }

}

// still need to implement log in ideas
