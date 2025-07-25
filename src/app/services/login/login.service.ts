import { Injectable } from '@angular/core';

export interface Login {
  id?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
}
