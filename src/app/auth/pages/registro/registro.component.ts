import { Component } from '@angular/core';
import {
  AbstractControlOptions,
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
import { ProvinciaCiudadService } from 'src/app/services/provincia-ciudad.service';
import { Ciudad } from '@interfaces/Ciudad';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  ciudades: Ciudad[] = [];
  subscription?: Subscription;

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public provinciaCiudadService: ProvinciaCiudadService
  ) {
    this.registroForm = this.formBuilder.group(
      {
        nombres: new FormControl<string>('', Validators.required),
        apellidos: new FormControl<string>('', Validators.required),
        celular: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        cedula: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          CustomValidators.validarCedula,
        ]),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        clave: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmarClave: new FormControl<string>('', Validators.required),
        idProvincia: new FormControl<number>(0, [Validators.required]),
        idCiudad: new FormControl<number>(
          {
            value: 0,
            disabled: true,
          },
          [Validators.required]
        ),
        direccion: new FormControl<string>('', [Validators.required]),
        rol: ['usuario'],
      },
      {
        validators: [CustomValidators.matchPasswords], // Agregamos la validación personalizada
      }as AbstractControlOptions
    );
  }

  ngOnInit(): void {}

  registrar(): void {
     if (this.registroForm.valid) {

      const payload = {
        ...this.registroForm.value,
        idProvincia: parseInt(this.registroForm.get('idProvincia')!.value),
        idCiudad: parseInt(this.registroForm.get('idCiudad')!.value),
      };

      this.subscription = this.authService
        .registrar(payload)
        .subscribe(() => {
          this.router.navigateByUrl('/auth/login');
        });
    } else {
      this.registroForm.markAllAsTouched();
      this.toastr.warning('', 'Complete los campos requeridos');
    }
  }

  cargarCiudades(event: Event) {
    const idProvincia = parseInt((event.target as HTMLSelectElement).value);

    this.subscription = this.provinciaCiudadService
      .obtenerCiudadesPorIdProvincia(idProvincia)
      .subscribe({
        next: (ciudades) => {
          this.ciudades = ciudades;
          this.registroForm.get('idCiudad')?.enable();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
