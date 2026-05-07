import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../services/user-profile';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient, private router: Router, public userProfile: UserProfile) { }
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
    let existingUser = "";
    this.http.get<User>(`${environment.apiUrl}/user?username=${username}`)
      .subscribe({
        next: (response) => {

        }
      })
  }

  onSubmit() {

    if (!(this.passwordsMatch())) {
      alert("Passwords Must Match");
      return;
    }

    const userData = this.buildUserData();
    
    let existingUser: string = "";
    this.http.get<User>(`${environment.apiUrl}/user?username=${userData.username}`)
      .subscribe({
        next: (response) => {
          alert(`Username ${userData.username} already taken`);

        },
        error: (err) => {
          if (err.status === 404) {
            this.http.post(`${environment.apiUrl}/user`, userData)
              .subscribe({
                next: (response) => {
                  console.log("Success!");

                  this.router.navigate(['/transactions']); // maybe go to an account chooser page that allows to create account

                },
                error: (error) => console.error("Error!ahaha", error),
              })
          } else {
            console.error("Unexpected error: ", err);
          }
        }
      });

  }
}
