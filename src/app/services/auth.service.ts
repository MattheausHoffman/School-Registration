import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  ok: boolean;
  userId?: number;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload) {
    return this.http.post<LoginResult>(`${this.baseUrl}/auth/login`, payload).pipe(
      map((res) => !!res?.ok),
      tap((ok) => {
        if (ok) {
          localStorage.setItem('auth.logged', 'true');
        } else {
          localStorage.removeItem('auth.logged');
        }
      }),
      catchError(() => {
        localStorage.removeItem('auth.logged');
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth.logged');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth.logged') === 'true';
  }
}
