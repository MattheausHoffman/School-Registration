import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'School-Registration';
  selectedForm: 'student-register' | 'teacher-register' | 'student' | 'teacher' | 'student-logged' | null = 'student-register';

  onLoginSuccess() {
    this.selectedForm = 'student-logged';
  }

  showLogin() {
    this.selectedForm = 'student';
  }
}
