import { AbstractControl, ValidationErrors } from '@angular/forms';

const CPFS_INVALIDOS = [
  '00000000000', '11111111111', '22222222222', '33333333333',
  '44444444444', '55555555555', '66666666666', '77777777777',
  '88888888888', '99999999999'
];

export function cpfValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cpf = (control.value || '').replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos, não é sequência repetida e não está na lista de inválidos
  if (
    !cpf ||
    cpf.length !== 11 ||
    CPFS_INVALIDOS.includes(cpf)
  ) {
    return { cpfInvalido: true };
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return { cpfInvalido: true };

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return { cpfInvalido: true };

  return null;
}
