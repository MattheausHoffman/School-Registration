import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { cpfValidator } from '../../models/cpf-format';
import { TeacherService } from '../../services/teacher/teacher.service';
import { Teacher } from '../../models/teacher';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-teacher-register',
  standalone: false,
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css',
})

export class TeacherRegisterComponent {
  @Output() goToLoginEvent = new EventEmitter<void>();
  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private usersService: UsersService // adicione este serviço
  ) {
    this.teacherForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      serieAno: ['', Validators.required],
      disciplina: [[], [Validators.required, (control: AbstractControl) => Array.isArray(control.value) && control.value.length > 0 ? null : { required: true }]],
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      // Dados para a tabela users
      const userPayload = {
        nome: this.teacherForm.value.nome,
        sobrenome: this.teacherForm.value.sobrenome,
        email: this.teacherForm.value.email,
        telefone: this.teacherForm.value.telefone,
        dataNascimento: this.teacherForm.value.dataNascimento,
        genero: this.teacherForm.value.genero,
        cpf: this.teacherForm.value.cpf,
        password: this.teacherForm.value.password || '123456789', // Add password field
      };

      this.usersService.createUsers(userPayload).subscribe({
        next: (userRes: any) => {
          // Dados para a tabela teachers
          const teacherPayload = {
            userId: userRes.id,
            serieAno: this.teacherForm.value.serieAno,
            disciplina: Array.isArray(this.teacherForm.value.disciplina)
              ? this.teacherForm.value.disciplina.join(',')
              : this.teacherForm.value.disciplina
          };
          this.teacherService.createTeacher(teacherPayload).subscribe({
            next: (teacherRes) => {
              console.log('Professor cadastrado com sucesso:', teacherRes);
              this.goToLoginEvent.emit();
            },
            error: (err) => {
              console.error('Erro ao cadastrar professor:', err);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
        }
      });
    } else {
      console.warn('Formulário inválido');
      this.teacherForm.markAllAsTouched();
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
