import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) { }
  
  public isAuthenticated(username: string, hashedPassword: string): boolean {
    const params = new HttpParams().set('username', username);
    const userData: any = this.http.get('https://opulent-space-meme-4wj9xw4jg693g4-5001.app.github.dev/user', {params});
    const comparisonPassword = userData.passwordHash;
    return bcrypt.compareSync(hashedPassword, comparisonPassword);
  }
}
