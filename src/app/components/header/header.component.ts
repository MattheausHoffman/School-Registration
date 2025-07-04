import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() formSelect = new EventEmitter<
    'student-register' | 'teacher-register'
  >();

  selectForm(type: 'student-register' | 'teacher-register') {
    this.formSelect.emit(type);
  }
}
