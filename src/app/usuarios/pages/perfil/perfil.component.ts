import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '@interfaces/Usuario';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
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
    correo: '',
    clave: '',
    rol: '',
    idProvincia: 0,
    idCiudad: 0,
    direccion: '',
    estado: '',
    adopcionPendiente: false,
  };
  editMode = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    const userId = this.authService.getidUsuario(); // Obtén el ID del usuario autenticado
    this.usuarioService.obtenerUsuarioPorIdNew(userId).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar el perfil', 'Error');
      },
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  guardarCambios(): void {
    /* this.usuarioService.actualizarUsuario(this.usuario).subscribe({
      next: () => {
        this.toastr.success('Perfil actualizado correctamente', 'Éxito');
        this.editMode = false;
      },
      error: (error) => {
        this.toastr.error('Error al actualizar el perfil', 'Error');
      },
    }); */
  }
}
