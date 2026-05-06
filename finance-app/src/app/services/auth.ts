import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) { }
  
  public isAuthenticated(comparisonPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(comparisonPassword, hashedPassword);
  }
}
