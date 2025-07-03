import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() formSelect = new EventEmitter<'student' | 'teacher'>();

  selectForm(type: 'student' | 'teacher') {
    this.formSelect.emit(type);
  }
}
