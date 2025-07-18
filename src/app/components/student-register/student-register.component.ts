import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from '../../models/cpf-format';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-register',
  standalone: false,
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css',
})
export class StudentRegisterComponent {
  @Output() goToLoginEvent = new EventEmitter<void>();
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cpfAluno: ['', [Validators.required, cpfValidator]],
      serieAno: ['', Validators.required],
      semestre: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('Formulário completo do Aluno', this.studentForm.value);
      this.goToLoginEvent.emit();

      const student: Student = this.studentForm.value;

      this.studentService.createStudent(student).subscribe({
        next: (res) => {
          console.log('Aluno cadastrado com sucesso:', res);
          this.goToLoginEvent.emit(); // só vai para o login se der certo
        },
        error: (err) => {
          console.error('Erro ao cadastrar aluno:', err);
        },
      });
    } else {
      console.warn('Formulário inválido');
      this.studentForm.markAllAsTouched(); // marca todos os campos para mostrar os erros
    }
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.goToLoginEvent.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
