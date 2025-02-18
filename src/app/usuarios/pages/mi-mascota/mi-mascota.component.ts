import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MascotaService } from 'src/app/services/mascota.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mi-mascota',
  imports: [ReactiveFormsModule],
  templateUrl: './mi-mascota.component.html',
  styleUrl: './mi-mascota.component.scss'
})
export class MiMascotaComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;
  mascotaForm: FormGroup; // Cambiar el nombre del formulario
  isEditMode: boolean = false; // Modo edición
  idStorage: number | undefined;
  mascotaId: number | undefined;
  baseUrl:string = `${window.location.origin}`
  extensionUrl: string = 'usuario/mascota'

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private mascotaService: MascotaService, // Cambiar el servicio
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private router: Router
  ) {
    this.mascotaForm = this.fb.group({
      nombre: new FormControl<string>('', [Validators.required]),
      especie: new FormControl<string>('', [Validators.required]),
      raza: new FormControl<string>(''),
      edad: new FormControl<string>(''),
      sexo: new FormControl<string>('', [Validators.required]),
      tamano: new FormControl<string>('', [Validators.required]),
      descripcion: new FormControl<string>(''),
      estado: new FormControl<string>(''),
      idStorage: new FormControl<number | null>(null),
      idUsuario: new FormControl<number | null>(null), // Este campo se asignará dinámicamente
    });
  }

  ngOnInit(){
    console.log('base url', `${this.baseUrl}/${this.extensionUrl}`);
    
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditMode = !!this.mascotaId;

    if (this.isEditMode) {
      this.mascotaService
        .obtenerMascotasPorId(this.mascotaId)
        .subscribe((mascota) => {
          this.mascotaForm.patchValue(mascota);
          if (mascota.Storage && mascota.Storage.url) {
            this.avatarUrl = mascota.Storage.url;
          }
        });
    }
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
          this.mascotaForm.patchValue({
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

  guardarMascota() {
    if (this.mascotaForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos obligatorios.', 'Error');
      return;
    }

    const mascotaData = this.mascotaForm.value;
    mascotaData.urlQR = `${this.baseUrl}/${this.extensionUrl}`

    if (this.isEditMode) {
      // Lógica para editar mascota
      this.mascotaService.actualizarMascota(this.mascotaId!,mascotaData).subscribe({
        next: () => {
          this.toastr.success('Mascota actualizada correctamente', 'Éxito');
          this.router.navigateByUrl('/usuario/mis-mascotas')
        },
        error: (error) => {
          this.toastr.error('Error al actualizar la mascota', 'Error');
        },
      });
    } else {
      // Lógica para crear mascota
      this.mascotaService.crearMascota(mascotaData).subscribe({
        next: () => {
          this.toastr.success('Mascota creada correctamente', 'Éxito');
          this.mascotaForm.reset();
          this.router.navigateByUrl('/usuario/mis-mascotas')
        },
        error: (error) => {
          this.toastr.error('Error al crear la mascota', 'Error');
        },
      });
    }
  }
}
