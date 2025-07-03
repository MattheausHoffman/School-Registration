import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-register',
  standalone: false,
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css',
})
export class TeacherRegisterComponent {
  @Output() loginRequest = new EventEmitter<void>();

  goToLogin(event: Event) {
    event.preventDefault();
    this.loginRequest.emit();
  }
}
