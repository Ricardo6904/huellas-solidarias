import { Component, signal, ViewChild } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Router } from '@angular/router';
import { StorageServiceService } from '../../../services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mascota } from '@interfaces/Mascota';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';

@Component({
  selector: 'app-mis-mascotas',
  imports: [
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss',
})
export class MisMascotasComponent {
  
}
