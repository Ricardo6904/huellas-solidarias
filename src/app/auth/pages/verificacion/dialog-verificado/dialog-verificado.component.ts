import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-verificado',
  imports: [],
  templateUrl: './dialog-verificado.component.html',
  styleUrl: './dialog-verificado.component.scss'
})
export class DialogVerificadoComponent {
  @Output() cerrarDialogo = new EventEmitter<void>();

  cerrarModal() {
    this.cerrarDialogo.emit();
  }
}
