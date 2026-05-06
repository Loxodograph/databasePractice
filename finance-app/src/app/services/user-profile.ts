import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfile {
  public userDetails = new BehaviorSubject<any>({
    userName: '',
    loggedIn: false,
    accountNumber: 0,
    hashedPassword: '',
    salt: '',
  });

}
