import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;
  refugioForm: FormGroup;
  isEditMode: any;
  idStorage: number | undefined;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastr: ToastrService
  ) {
    this.refugioForm = this.fb.group({
      nombre: new FormControl<string>('', [Validators.required]),
      celular: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required,Validators.email]),
      clave: new FormControl<string>('', [Validators.required]),
      redesSociales: new FormControl<string>('', []),
      descripcion: new FormControl<string>('', []),
      horarioAtencion: new FormControl<string>('', []),
      direccion: new FormControl<string>('', [Validators.required]),
      idProvincia: new FormControl<number | null>(null, [Validators.required]),
      idCiudad: new FormControl<number | null>(null, [Validators.required]),
    });
  }
  
  subirImagen() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('file', file);

      this.storageService.subirImagen(formData).subscribe({
        next: (file) => {
          this.idStorage = file.data.id;
          this.refugioForm.patchValue({
            idStorage: this.idStorage,
          });
        },
        error: () => {
          this.toastr.error('Error al subir imagen', 'Formato no adecuado');
        },
      });
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
