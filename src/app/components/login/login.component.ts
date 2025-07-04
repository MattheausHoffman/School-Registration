import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() backToRegister = new EventEmitter<void>();

  email: string = '';
  password: string = '';

  login() {
    if (this.email && this.password) {
      this.loginSuccess.emit();
    }
  }

  goBack(event: Event) {
    event.preventDefault();
    this.backToRegister.emit();
  }
}
