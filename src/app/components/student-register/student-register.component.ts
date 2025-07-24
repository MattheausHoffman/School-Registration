import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from '../../models/cpf-format';
import { StudentService } from '../../services/student/student.service';
import { UsersService } from '../../services/users/users.service'; // adicione este import

@Component({
  selector: 'app-student-register',
  standalone: false,
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css',
})
export class StudentRegisterComponent {
  @Output() goToLoginEvent = new EventEmitter<void>();
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private usersService: UsersService // adicione este serviço
  ) {
    this.studentForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      serieAno: ['', Validators.required],
      semestre: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      // Dados para a tabela users
      const userPayload = {
        nome: this.studentForm.value.nome,
        sobrenome: this.studentForm.value.sobrenome,
        email: this.studentForm.value.email,
        telefone: this.studentForm.value.telefone,
        dataNascimento: this.studentForm.value.dataNascimento,
        genero: this.studentForm.value.genero,
        cpf: this.studentForm.value.cpf,
        password: this.generateRandomPassword()
      };

      this.usersService.createUsers(userPayload).subscribe({
        next: (userRes: any) => {
          const studentPayload = {
            userId: userRes.id,
            serieAno: this.studentForm.value.serieAno,
            semestre: this.studentForm.value.semestre,
          };
          this.studentService.createStudent(studentPayload).subscribe({
            next: (studentRes) => {
              console.log('Aluno cadastrado com sucesso:', studentRes);
              this.goToLoginEvent.emit();
            },
            error: (err) => {
              console.error('Erro ao cadastrar aluno:', err);
            },
          });
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
        },
      });
    } else {
      console.warn('Formulário inválido');
      this.studentForm.markAllAsTouched();
    }
  }

  generateRandomPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
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
