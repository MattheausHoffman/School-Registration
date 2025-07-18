import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { cpfValidator } from '../../models/cpf-format';
import { TeacherService } from '../../services/teacher/teacher.service';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-teacher-register',
  standalone: false,
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css',
})
export class TeacherRegisterComponent {
  @Output() goToLoginEvent = new EventEmitter<void>();
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder, private teacherService: TeacherService) {
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

  onSubmit() {
    if (this.teacherForm.valid) {
      console.log('Formulário completo do Professor', this.teacherForm.value);
      this.goToLoginEvent.emit();

      const teacher: Teacher = this.teacherForm.value;

            this.teacherService.createTeacher(teacher).subscribe({
              next: (res) => {
                console.log('Professor cadastrado com sucesso:', res);
                this.goToLoginEvent.emit(); // só vai para o login se der certo
              },
              error: (err) => {
                console.error('Erro ao cadastrar professor:', err);
              },
            });
          } else {
            console.warn('Formulário inválido');
            this.teacherForm.markAllAsTouched(); // marca todos os campos para mostrar os erros
    }
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.goToLoginEvent.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.teacherForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
