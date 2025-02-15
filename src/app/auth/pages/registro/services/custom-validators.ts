import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static validarIdentificacion(control: AbstractControl): ValidationErrors | null {
    const identificacion = control.value;

    if (!identificacion) {
      return null; // Si no hay valor, no aplica la validación
    }

    // Obtener el tipo de identificación del formulario
    const tipoIdentificacion = control.parent?.get('tipoIdentificacion')?.value;

    if (tipoIdentificacion === 'cedula') {
      // Validación para cédula ecuatoriana
      if (identificacion.length !== 10 || isNaN(identificacion)) {
        return { identificacionInvalida: true };
      }

      // Validar que los dos primeros dígitos correspondan a una provincia válida
      const provincia = parseInt(identificacion.substring(0, 2), 10);
      if (provincia < 1 || provincia > 24) {
        return { identificacionInvalida: true };
      }

      // Algoritmo de validación de cédula ecuatoriana
      const digitos = identificacion.split('').map(Number);
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
        : { identificacionInvalida: true };
    } else if (tipoIdentificacion === 'pasaporte') {
      // Validación para pasaporte (letras y números, entre 6 y 12 caracteres)
      if (!/^[A-Za-z0-9]{6,12}$/.test(identificacion)) {
        return { identificacionInvalida: true };
      }
      return null;
    }

    return null; // Si no se selecciona un tipo válido, no aplica la validación
  }

  static matchPasswords(group: FormGroup) {
    const clave = group.get('clave')?.value;
    const confirmarClave = group.get('confirmarClave')?.value;

    return clave === confirmarClave ? null : { passwordsNoMatch: true };
  }

  static mayorDeEdad: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = control.value;
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaLimite = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
      if (new Date(fechaNacimiento) > fechaLimite) {
        return { mayorDeEdad: true };
      }
    }
    return null;
  };
}