import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static validarCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;

    if (!cedula) {
      return null; // Si no hay valor, no aplica la validación
    }

    if (cedula.length !== 10 || isNaN(cedula)) {
      return { cedulaInvalida: true };
    }

    // Validar que los dos primeros dígitos correspondan a una provincia válida
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) {
      return { cedulaInvalida: true };
    }

    // Algoritmo de validación de cédula ecuatoriana
    const digitos = cedula.split('').map(Number);
    const digitoVerificador = digitos.pop();

    let suma = 0;
    digitos.forEach((d: number, i: number) => {
      if (i % 2 === 0) {
        const producto = d * 2;
        suma += producto > 9 ? producto - 9 : producto;
      } else {
        suma += d;
      }
    });

    const modulo = suma % 10;
    const digitoCalculado = modulo === 0 ? 0 : 10 - modulo;

    return digitoCalculado === digitoVerificador
      ? null
      : { cedulaInvalida: true };
  }

  static matchPasswords(group: FormGroup) {
    const clave = group.get('clave')?.value;
    const confirmarClave = group.get('confirmarClave')?.value;

    return clave === confirmarClave ? null : { passwordsNoMatch: true };
  }
}
