import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() backToRegister = new EventEmitter<void>();

  email: string = '';
  password: string = '';
  errorMsg: string = '';

  // posição do toast: topo-direito
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private auth: AuthService, private snack: MatSnackBar) {}

  login() {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.openError('Preencha e-mail e senha.');
      return;
    }

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (ok) => {
        if (ok) {
          this.openSuccess('Login realizado com sucesso!');
          this.loginSuccess.emit();
        } else {
          this.errorMsg = 'E-mail ou senha inválidos.';
          this.openError(this.errorMsg);
        }
      },
      error: (err) => {
        const msg = err?.error?.message || 'Falha ao tentar fazer login.';
        this.errorMsg = msg;
        this.openError(`Falha no login: ${msg}`);
      },
    });
  }

  goBack(event: Event) {
    event.preventDefault();
    this.backToRegister.emit();
  }

  private openSuccess(message: string) {
    this.snack.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
    });
  }

  private openError(message: string) {
    this.snack.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
    });
  }
}
