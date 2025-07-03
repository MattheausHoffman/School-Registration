import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() backToRegister = new EventEmitter<void>();

  goBack(event: Event) {
    event.preventDefault();
    this.backToRegister.emit();
  }
}
