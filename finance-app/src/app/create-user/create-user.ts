import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../services/user-profile';
import { FormsModule } from '@angular/forms';
import { User, Account } from '../user';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
  standalone: true,
})
export class CreateUser {
  userName: string = "";
  password: string = "";
  emailAddress: string = "";
  passwordConfirmation: string = "";

  constructor(public authService: AuthService, private http: HttpClient, private router: Router, public userProfile: UserProfile) { }
  passwordsMatch(): boolean {
    if (this.password !== this.passwordConfirmation) {
      alert('Passwords Must Match');
      return false;
    }
    return true;
  }

  buildUserData() {
    return {
      email: this.emailAddress,
      username: this.userName,
      password: this.password,
    }
  }

  checkUsernameAvailability(username: string, userData: any) {

    this.http.get<User>(`${environment.apiUrl}/user?username=${username}`)
      .subscribe({
        next: (response) => {
          // Copy from below, username already taken
          alert(`Username ${userData.username} already taken`);
        },
        error: (err) => {
          if (err.status === 404) {
            this.createUser(userData);
          }
        },
        //create error
        // create function that creates user
      })
  }

  createUser(userData: any) {
    this.http.post<Account>(`${environment.apiUrl}/user`, userData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userProfile.userDetails.getValue().userName = this.userName;
          this.userProfile.userDetails.getValue().id = response.id;
          console.log("Success");
        }
      });
      
  }


  async onSubmit() {

    if (!(this.passwordsMatch())) {
      alert("Passwords Must Match");
      return;
    }

    const userData = this.buildUserData();

    await this.checkUsernameAvailability(this.userName, userData);
    this.loginAuth();

    this.router.navigate(['/accounts']);

  }

  loginAuth() {
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
}
