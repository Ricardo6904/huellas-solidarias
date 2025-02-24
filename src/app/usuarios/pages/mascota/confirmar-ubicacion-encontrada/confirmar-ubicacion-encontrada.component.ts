import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-confirmar-ubicacion-encontrada',
  imports: [ReactiveFormsModule],
  templateUrl: './confirmar-ubicacion-encontrada.component.html',
  styleUrl: './confirmar-ubicacion-encontrada.component.scss',
})
export class ConfirmarUbicacionEncontradaComponent {
  @Input() mascotaNombre: string = ''; // Nombre de la mascota
  @Output() confirm = new EventEmitter<{
    descripcion: string;
    latitud: number | null;
    longitud: number | null;
  }>(); // Evento para confirmar
  @Output() cancel = new EventEmitter<void>(); // Evento para cancelar

  ubicacion: { latitud: number | null; longitud: number | null } = {
    latitud: null,
    longitud: null,
  };
  error: string | null = null;
  confirmForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.confirmForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  // Obtener la ubicación del dispositivo
  // Método para obtener la ubicación
  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ubicacion = {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          };
          this.error = null; // Limpiar el mensaje de error
        },
        (error) => {
          this.error =
            'No se pudo obtener la ubicación. Asegúrate de permitir el acceso a la ubicación.';
          this.ubicacion = { latitud: null, longitud: null }; // Establecer en null si hay error
        }
      );
    } else {
      this.error = 'Geolocalización no es soportada por este navegador.';
      this.ubicacion = { latitud: null, longitud: null }; // Establecer en null si no hay soporte
    }
  }
  // Confirmar la ubicación
  onConfirm() {
    if (this.confirmForm.valid) {
      const descripcion = this.confirmForm.value.descripcion;
  
      // Verificar si las coordenadas son válidas
      const latitud = (this.ubicacion.latitud !== null && !isNaN(this.ubicacion.latitud)) 
                        ? this.ubicacion.latitud 
                        : null;
      const longitud = (this.ubicacion.longitud !== null && !isNaN(this.ubicacion.longitud)) 
                        ? this.ubicacion.longitud 
                        : null;
  
      // Emitir los datos
      this.confirm.emit({ descripcion, latitud, longitud });
    }
  }

  // Cancelar
  onCancel() {
    this.cancel.emit();
  }
}
