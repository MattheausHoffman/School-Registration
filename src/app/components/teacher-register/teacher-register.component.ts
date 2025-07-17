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
    cpfProfessor: '',
  };

  get isCpfInvalido(): boolean {
    const cpfField = (this as any).cpfProfessor;
    if (cpfField && cpfField.errors?.['cpfInvalido'] && cpfField.touched) {
      console.log('CPF inválido detectado!');
      return true;
    }
    return false;
  }

  goToLogin(event: Event, form?: NgForm): void {
    event.preventDefault();

    if (form && form.submitted && form.invalid) {
      return;
    }

    this.loginRequest.emit();
  }
}
