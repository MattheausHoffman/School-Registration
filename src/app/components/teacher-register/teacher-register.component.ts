import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { cpfValidator } from '../../models/cpf-format';

@Component({
  selector: 'app-teacher-register',
  standalone: false,
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css',
})
export class TeacherRegisterComponent {
  @Output() loginRequest = new EventEmitter<void>();
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cpfProfessor: ['', [Validators.required, cpfValidator]],
    });
  }

  goToLogin(event: Event): void {
    event.preventDefault();

    if (this.teacherForm.invalid) {
      return;
    }

    console.log('Formulário completo do Professor', this.teacherForm.value);

    this.loginRequest.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.teacherForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
