import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomValidators } from './services/custom-validators';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  provincias: any = ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Tungurahua'];
  ciudades: any = ['Ambato', 'Baños de Agua Santa', 'Santa Rosa'];

  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group(
      {
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        celular: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        cedula: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            CustomValidators.validarCedula,
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        confirmarClave: ['', Validators.required],
        provincia: [''],
        ciudad: [''],
        direccion: [''],
        rol: ['usuario'],
      },
      {
        validators: [CustomValidators.matchPasswords], // Agregamos la validación personalizada
      }
    );
  }

  registrar(): void {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe(() => {
        this.router.navigateByUrl('/auth/login');
      });
      console.log(this.registroForm.value); // Envía los datos
      //  del formulario al backend para registrar al usuario
      //this.registroForm.reset(); // Reinicia el formulario después de enviar los datos
    } else {
      this.registroForm.markAllAsTouched();
      this.toastr.warning('', 'Complete los campos requeridos');
    }
  }
}
