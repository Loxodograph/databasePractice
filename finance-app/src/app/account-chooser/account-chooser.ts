import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserProfile } from '../services/user-profile';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-account-chooser',
  imports: [ReactiveFormsModule],
  templateUrl: './account-chooser.html',
  styleUrl: './account-chooser.css',
})

export class AccountChooser implements OnInit {
  accountForm: FormGroup;
  public accounts = signal<any[]>([]);
  constructor(private http: HttpClient, private fb: FormBuilder, public userProfile: UserProfile) {
    this.accountForm = this.fb.group({
      type: [''],
      balance: [''],
    })
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formData = {
        ...this.accountForm.value,
        userId: this.userProfile.userDetails.getValue().userId, // fix this
      };
      this.http.post(`${environment.apiUrl}/transactions`, formData)
        .subscribe({
          next: (response) => {
            console.log("Success!", response);
            this.accountList(this.userProfile.userDetails.getValue().id);
            this.accountForm.reset({ type: '', balance: '' });
          },
          error: (error) => console.error("Error!", error),
        })
    }

  }

  ngOnInit(): void {
    this.accountList(this.userProfile.userDetails.getValue().id);
  }


  accountList(id: number) {
    this.http.get<any[]>(`${environment.apiUrl}/accounts?id=${id}`)
      .subscribe((response) => {
        const formatted = response.map(t => ({
          ...t,
        }));

        this.accounts.set(formatted);
      });

  }

  selectAccount(id: number) {
    this.userProfile.userDetails.getValue().id = id;
  }
}
