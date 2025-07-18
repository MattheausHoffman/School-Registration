import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Login {
  id?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  createLogin(login: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl, login);
  }
}
