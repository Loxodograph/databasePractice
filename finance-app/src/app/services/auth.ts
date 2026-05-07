import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: { username: string; password: string }) {
    // We use POST to keep credentials out of the URL
    return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, credentials);
  }
}