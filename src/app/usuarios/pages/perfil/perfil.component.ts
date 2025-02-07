import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ciudad } from '@interfaces/Ciudad';
import { Usuario } from '@interfaces/Usuario';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaCiudadService } from 'src/app/services/provincia-ciudad.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  usuario: Usuario = {
    id: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    celular: '',
    email: '',
    clave: '',
    rol: '',
    idProvincia: 0,
    idCiudad: 0,
    direccion: '',
    estado: '',
    adopcionPendiente: false,
    ciudad: {
      id: 0,
      idProvincia: 0,
      nombre: '',
    },
    provincia: {
      id: 0,
      nombre: '',
    },
  };
  editMode = false;
  perfilForm: FormGroup;
  ciudades: Ciudad[] = [];
  subscription?: Subscription;
  isLoading=true;
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public provinciaCiudadService: ProvinciaCiudadService
  ) {
    this.perfilForm = this.fb.group({
      nombres: new FormControl<string>('', Validators.required),
      apellidos: new FormControl<string>('', Validators.required),
      celular: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/),
      ]) /* 
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]), */,
      idProvincia: new FormControl<number>(0, [Validators.required]),
      idCiudad: new FormControl<number>(
        {
          value: 0,
          disabled: true,
        },
        [Validators.required]
      ),
      direccion: new FormControl<string>('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    const userId = this.authService.getidUsuario(); // Obtén el ID del usuario autenticado
    try {
      this.usuarioService.obtenerUsuarioPorIdNew(userId).subscribe({
        next: (res) => {
          this.isLoading=false;
          this.usuario = res.data;

          // Llenar el formulario con los datos del usuario
          this.perfilForm.patchValue({
            nombres: this.usuario.nombres,
            apellidos: this.usuario.apellidos,
            celular: this.usuario.celular,
            idProvincia: this.usuario.idProvincia,
            idCiudad: this.usuario.idCiudad,
            direccion: this.usuario.direccion,
          });

          // Si hay una provincia seleccionada, cargar las ciudades
          if (this.usuario.idProvincia) {
            this.cargarCiudades(this.usuario.idProvincia);
          }
        },
        error: (error) => {
          this.isLoading=false
          this.toastr.error('Error al cargar el perfil', 'Error');
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;

    if (this.editMode) {
      // Al entrar en modo edición, cargar las ciudades si ya hay una provincia seleccionada
      const idProvincia = this.perfilForm.get('idProvincia')?.value;
      if (idProvincia) {
        this.cargarCiudades(idProvincia);
      }
    }
  }

  /*  cargarCiudades(event: Event) {
    const idProvincia = parseInt((event.target as HTMLSelectElement).value);

    this.subscription = this.provinciaCiudadService
      .obtenerCiudadesPorIdProvincia(idProvincia)
      .subscribe({
        next: (ciudades) => {
          this.ciudades = ciudades;
          this.perfilForm.get('idCiudad')?.enable();
        },
        error: (err) => {
          console.log(err);
        },
      });
  } */
  cargarCiudades(idProvincia: number | Event): void {
    let provinciaId: number;

    // Si el parámetro es un Event, extraer el valor del select
    if (idProvincia instanceof Event) {
      provinciaId = parseInt((idProvincia.target as HTMLSelectElement).value);
    } else {
      // Si el parámetro es un número, usarlo directamente
      provinciaId = idProvincia;
    }

    this.subscription = this.provinciaCiudadService
      .obtenerCiudadesPorIdProvincia(provinciaId)
      .subscribe({
        next: (ciudades) => {
          this.ciudades = ciudades;
          this.perfilForm.get('idCiudad')?.enable();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  guardarCambios(): void {
    if (this.perfilForm.valid) {
      const userId = this.authService.getidUsuario();
      const datosActualizados = this.perfilForm.value;

      this.usuarioService
        .actualizarUsuario(datosActualizados, userId)
        .subscribe({
          next: () => {
            this.toastr.success('Perfil actualizado correctamente', 'Éxito');
            this.editMode = false;
            this.cargarPerfil(); // Recargar el perfil para mostrar los cambios
          },
          error: (error) => {
            this.toastr.error('Error al actualizar el perfil', 'Error');
          },
        });
    } else {
      this.toastr.warning(
        'Por favor, completa todos los campos requeridos',
        'Advertencia'
      );
    }
  }
}
