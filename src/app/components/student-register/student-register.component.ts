import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-register',
  standalone: false,
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css',
})
export class StudentRegisterComponent {
  @Output() loginRequest = new EventEmitter<void>();

  goToLogin(event: Event) {
    event.preventDefault();
    this.loginRequest.emit();
  }
}
