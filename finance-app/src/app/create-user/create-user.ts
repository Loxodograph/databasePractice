import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../services/user-profile';
import { FormsModule } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { User } from '../user';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
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
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(this.password);
      const userData = {
        email: this.emailAddress,
        username: this.userName,
        passwordHash: hashedPassword,
        salt: salt,
      }
      let existingUser: string = "";
      this.http.get<User>(`https://opulent-space-meme-4wj9xw4jg693g4-5001.app.github.dev/user?username=${userData.username}`)
        .subscribe({
          next: (response) => {
            existingUser = response.username;
            console.log(existingUser);
            if (response !== null) {
              alert(`Username ${userData.username} already taken`);
            } else {
              this.http.post('https://opulent-space-meme-4wj9xw4jg693g4-5001.app.github.dev/user', userData)
                .subscribe({
                  next: (response) => {
                    console.log("Success!", response);
                  },
                  error: (error) => console.error("Error!", error),
                })
            }
          }
        })



      if (existingUser !== null) {
        alert(`Username ${userData.username} already taken`);
      } else {
        this.http.post('https://opulent-space-meme-4wj9xw4jg693g4-5001.app.github.dev/user', userData)
          .subscribe({
            next: (response) => {
              console.log("Success!", response);
            },
            error: (error) => console.error("Error!", error),
          })
      }

    };
  }
}

