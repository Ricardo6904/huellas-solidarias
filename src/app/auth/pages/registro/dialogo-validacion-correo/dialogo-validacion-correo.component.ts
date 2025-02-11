import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialogo-validacion-correo',
  imports: [CommonModule],
  templateUrl: './dialogo-validacion-correo.component.html',
  styleUrl: './dialogo-validacion-correo.component.scss'
})
export class DialogoValidacionCorreoComponent {
  @Output() cerrarDialogo = new EventEmitter<void>(); // Emite un evento al cerrar

  cerrar() {
    this.cerrarDialogo.emit();
  }
}
