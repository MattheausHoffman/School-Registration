import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-teacher-register',
  standalone: false,
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css',
})
export class TeacherRegisterComponent {
  @Output() loginRequest = new EventEmitter<void>();

  teacher = {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    dataNascimento: null,
    genero: '',
    cpfProfessor: ''
  };

  goToLogin(event: Event, form?: NgForm): void {
  event.preventDefault();

  // Só bloqueia se for um submit real do form
  if (form && form.submitted && form.invalid) {
    return;
  }

  this.loginRequest.emit(); // ou navegação
}

}

