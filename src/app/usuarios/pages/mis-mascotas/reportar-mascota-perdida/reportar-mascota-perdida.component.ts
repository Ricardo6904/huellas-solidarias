import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportar-mascota-perdida',
  imports: [ReactiveFormsModule],
  templateUrl: './reportar-mascota-perdida.component.html',
  styleUrl: './reportar-mascota-perdida.component.scss'
})
export class ReportarMascotaPerdidaComponent {
  @Input() selectedMascota: any; // Mascota seleccionada
  @Output() closeDialog = new EventEmitter<void>(); // Evento para cerrar el diálogo
  @Output() confirmReport = new EventEmitter<any>(); // Evento para confirmar el reporte

  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  // Cerrar el diálogo
  onClose() {
    this.closeDialog.emit();
  }

  // Confirmar el reporte
  onSubmit() {
    if (this.reportForm.valid) {
      const reportData = {
        idMascota: this.selectedMascota.id,
        estado: 'perdido',
        descripcion: this.reportForm.value.descripcion,
        latitud: null, // Mantener en null
        longitud: null, // Mantener en null
        activo: true, // Activo en true
        fechaEvento: new Date().toISOString(),
      };
      this.confirmReport.emit(reportData);
    }
  }
}
