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
  onSubmit() {

    if (!(this.password === this.passwordConfirmation)) {
      alert("Passwords Must Match");
    } else {

      const userData = {
        email: this.emailAddress,
        username: this.userName,
        password: this.password,
      }
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
                    this.userProfile.userDetails.getValue().userName = userData.username;
                    this.userProfile.userDetails.getValue().password = userData.password;
                    this.router.navigate(['/transactions']);

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
}
