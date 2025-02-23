import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar-ubicacion',
  imports: [],
  templateUrl: './confirmar-ubicacion.component.html',
  styleUrl: './confirmar-ubicacion.component.scss'
})
export class ConfirmarUbicacionComponent {
  @Input() mascotaNombre: string = ''; // Nombre de la mascota
  @Output() confirm = new EventEmitter<{ latitud: number | null, longitud: number | null }>(); // Evento para confirmar
  @Output() cancel = new EventEmitter<void>(); // Evento para cancelar

  ubicacion: { latitud: number | null, longitud: number | null } = { latitud: null, longitud: null };
  error: string | null = null;

  constructor() {}

  // Obtener la ubicación del dispositivo
  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ubicacion.latitud = position.coords.latitude;
          this.ubicacion.longitud = position.coords.longitude;
          this.error = null;
        },
        (error) => {
          this.error = 'No se pudo obtener la ubicación. Asegúrate de permitir el acceso a la ubicación.';
          this.ubicacion.latitud = null;
          this.ubicacion.longitud = null;
        }
      );
    } else {
      this.error = 'Geolocalización no es soportada por este navegador.';
    }
  }

  // Confirmar la ubicación
  onConfirm() {
    this.confirm.emit(this.ubicacion);
  }

  // Cancelar
  onCancel() {
    this.cancel.emit();
  }
}
