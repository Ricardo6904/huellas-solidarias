import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especie, Raza } from '@interfaces/EspecieRaza';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EspeciesRazasService } from 'src/app/services/especies-razas.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mi-mascota',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mi-mascota.component.html',
  styleUrl: './mi-mascota.component.scss',
})
export class MiMascotaComponent {
  subscription?: Subscription;
  sexoMascota = [
    { value: 'macho', text: 'Macho' },
    { value: 'hembra', text: 'Hembra' },
  ];
  tamanoMascota = [
    { value: 'pequeño', text: 'Pequeño' },
    { value: 'mediano', text: 'Mediano' },
    { value: 'grande', text: 'Grande' },
  ];
  especieMascota: Especie[] = [];
  razas: Raza[] = [];
  edades = [
    { age: 'Cachorro', description: 'Cachorro (0-1 año)' },
    { age: 'Joven', description: 'Joven (1-3 años)' },
    { age: 'Adulto', description: 'Adulto (3-7 años)' },
    { age: 'Mayor', description: 'Mayor (7+ años)' },
  ];

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;
  mascotaForm: FormGroup; // Cambiar el nombre del formulario
  isEditMode: boolean = false; // Modo edición
  idStorage: number | undefined;
  mascotaId: number | undefined;
  baseUrl: string = `${window.location.origin}`;
  extensionUrl: string = 'usuario/mascota';
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private mascotaService: MascotaService, // Cambiar el servicio
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: StorageServiceService,
    private especiesRazasService: EspeciesRazasService
  ) {
    this.mascotaForm = this.fb.group({
      nombre: new FormControl<string>('', [Validators.required]),
      idEspecie: new FormControl<number>(0, [Validators.required]),
      idRaza: new FormControl<number | null>(
        { value: null, disabled: true },
        Validators.required
      ),
      edad: new FormControl<string>(''),
      sexo: new FormControl<string>('', [Validators.required]),
      tamano: new FormControl<string>('', [Validators.required]),
      descripcion: new FormControl<string>(''),
      estado: new FormControl<string>('seguro'),
      idStorage: new FormControl<number | null>(null),
      idUsuario: new FormControl<number | null>(
        Number(this.localStorage.getItem('idUsuario'))
      ), // Este campo se asignará dinámicamente
    });
  }

  ngOnInit() {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditMode = !!this.mascotaId;

    if (this.isEditMode) {
      this.mascotaService
        .obtenerMascotasPorId(this.mascotaId)
        .subscribe((mascota) => {
          this.mascotaForm.get('idEspecie')?.setValue(mascota.idEspecie);

          this.especiesRazasService
            .obtenerRazasPorIdEspecie(Number(mascota.idEspecie))
            .subscribe({
              next: (razas) => {
                this.razas = razas;
                this.mascotaForm.get('idRaza')?.enable();
                this.mascotaForm.patchValue(mascota);
              },
              error: (err) => {
                console.log('Error al cargar razas:', err);
              },
            });
        });
    }

    this.especiesRazasService.obtenerEspecies().subscribe({
      next: (res) => {
        this.especieMascota = res;
      },
    });
  }

  cargarRazas(event: Event) {
    const idEspecie = parseInt((event.target as HTMLSelectElement).value);

    this.subscription = this.especiesRazasService
      .obtenerRazasPorIdEspecie(idEspecie)
      .subscribe({
        next: (razas) => {
          this.razas = razas;
          this.mascotaForm.get('idRaza')?.enable();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  subirImagen() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.isLoading = true
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('file', file);

      if (this.idStorage) {
        this.storageService.eliminarStorage(this.idStorage).subscribe({
          next: () => {
            // Una vez eliminada la imagen anterior, subir la nueva
            this.subirNuevaImagen(formData, reader, file);
          },
          error: (err) => {
            this.toastr.error('Error al eliminar la imagen anterior', 'Error');
            this.isLoading = false; // Rehabilitar el botón en caso de error
          },
        });
      } else {
        // Si no hay imagen anterior, subir la nueva directamente
        this.subirNuevaImagen(formData, reader, file);
      }

      /* this.storageService.subirImagen(formData).subscribe({
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
      reader.readAsDataURL(file);*/
    } 
  }

  subirNuevaImagen(formData: FormData, reader: FileReader, file: File) {
    this.storageService.subirImagen(formData).subscribe({
      next: (file) => {
        this.idStorage = file.data.id;
        this.mascotaForm.patchValue({
          idStorage: this.idStorage,
        });
        reader.onload = () => {
          this.avatarUrl = reader.result;
          this.isLoading = false; // Rehabilitar el botón una vez que la imagen se ha subido
        };
        reader.readAsDataURL(file);
      },
      error: () => {
        this.toastr.error('Error al subir imagen', 'Formato no adecuado');
        this.isLoading = false; // Rehabilitar el botón en caso de error
      },
    });
  }

  guardarMascota() {
    this.isLoading = true
    if (this.mascotaForm.invalid) {
      this.toastr.error(
        'Por favor, completa todos los campos obligatorios.',
        'Error'
      );
      return;
    }

    const mascotaData = this.mascotaForm.value;
    mascotaData.urlQR = `${this.baseUrl}/${this.extensionUrl}`;

    if (this.isEditMode) {
      // Lógica para editar mascota
      this.mascotaService
        .actualizarMascota(this.mascotaId!, mascotaData)
        .subscribe({
          next: () => {
            this.toastr.success('Mascota actualizada correctamente', 'Éxito');
            this.router.navigateByUrl('/usuario/mis-mascotas');
            this.isLoading = false
          },
          error: (error) => {
            this.toastr.error('Error al actualizar la mascota', 'Error');
            this.isLoading = false
          },
        });
    } else {
      // Lógica para crear mascota
      this.mascotaService.crearMascota(mascotaData).subscribe({
        next: () => {
          this.toastr.success('Mascota creada correctamente', 'Éxito');
          this.mascotaForm.reset();
          this.router.navigateByUrl('/usuario/mis-mascotas');
          this.isLoading = false
        },
        error: (error) => {
          this.toastr.error('Error al crear la mascota', 'Error');
          this.isLoading = false
        },
      });
    }
  }
}
