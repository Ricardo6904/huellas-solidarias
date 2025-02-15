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
import { DialogoValidacionCorreoComponent } from "./dialogo-validacion-correo/dialogo-validacion-correo.component";
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DialogoValidacionCorreoComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  ciudades: Ciudad[] = [];
  subscription?: Subscription;
  mostrarDialogo = false; // Controla la visibilidad del diálogo
  loading = false
  tiposIdentificacion = [
    { value: 'cedula', label: 'Cédula' },
    { value: 'pasaporte', label: 'Pasaporte' },
  ];

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService,
    public provinciaCiudadService: ProvinciaCiudadService,
    private localStorage:StorageServiceService
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
        tipoIdentificacion: new FormControl<string>('cedula', [Validators.required]),
        identificacion: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          CustomValidators.validarIdentificacion,
        ]),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        fechaNacimiento: new FormControl<Date | null>(null, [Validators.required, CustomValidators.mayorDeEdad]),
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

  // Propiedad computada para obtener el nombre del campo de identificación
  get nombreCampoIdentificacion(): string {
    const tipoIdentificacion = this.registroForm.get('tipoIdentificacion')?.value;
    if (tipoIdentificacion === 'cedula') {
      return 'Número de Cédula';
    } else if (tipoIdentificacion === 'pasaporte') {
      return 'Número de Pasaporte';
    }
    return 'Número de Identificación'; // Valor por defecto
  }


  registrar(): void {
    this.loading = true
     if (this.registroForm.valid) {

      const payload = {
        ...this.registroForm.value,
        idProvincia: parseInt(this.registroForm.get('idProvincia')!.value),
        idCiudad: parseInt(this.registroForm.get('idCiudad')!.value),
      };

      this.subscription = this.authService.registrar(payload).subscribe({
        next: (ress:any) => {
          this.mostrarDialogo = true;
          this.loading = false; // Desactiva el loading al terminar
          
          this.localStorage.setItem('token', ress.data.token)
          this.router.navigateByUrl('/auth/verificacion')
        },
        error: () => {
          this.loading = false; // Asegura que se desactive en caso de error
          this.toastr.error('Error al registrar usuario');
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      this.toastr.warning('', 'Complete los campos requeridos');
      this.loading = false
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
