import { Component, EventEmitter, Output } from '@angular/core';


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

  goToLogin(event: Event, form: any) {
    event.preventDefault();

    if (form.valid) {
      this.loginRequest.emit();
    } else {
      // Marca os campos como "tocados" para disparar as mensagens de erro
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }
}

