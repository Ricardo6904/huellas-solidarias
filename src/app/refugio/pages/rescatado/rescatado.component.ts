import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-rescatado',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rescatado.component.html',
  styleUrl: './rescatado.component.scss'
})
export class RescatadoComponent {

  sexoMascota: string[] = ['Macho', 'Hembra'];
  tamanoMascota: string[] = ['Pequeño', 'Mediano', 'Grande'];
  especieMascota: string[] = ['Gato', 'Perro', 'Otro'];
  razas: string[] = [
    'Labrador',
    'Pastor Alemán',
    'Bulldog',
    'Chihuahua',
    'Mestizo',
  ];
  edades = [
    { age: 'Cachorro', description: 'Cachorro (0-1 año)' },
    { age: 'Joven', description: 'Joven (1-3 años)' },
    { age: 'Adulto', description: 'Adulto (3-7 años)' },
    { age: 'Mayor', description: 'Mayor (7+ años)' },
  ];

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;

  idStorage: number | undefined;

  mascotaForm: FormGroup;

  mascotaId!: number | null;
  isEditMode: boolean = false;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private animalRescatadoService: AnimalRescatadoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: StorageServiceService
  ) {
    this.mascotaForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/),
          Validators.maxLength(20),
        ],
      ],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      tamano: ['', Validators.required],
      historia: [''],
      caracteristica: [''],
      condicion: [''],
      esEsterilizado: [''],
      idStorage: [null],
      idRefugio: this.localStorage.getItem('idRefugio'),
      especie: ['', Validators.required],
    });

    this.mascotaForm.untouched;
  }

  ngOnInit() {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditMode = !!this.mascotaId;

    if (this.isEditMode) {
      this.animalRescatadoService
        .obtenerMascotasPorId(this.mascotaId)
        .subscribe((mascota) => {
          this.mascotaForm.patchValue(mascota);
          if (mascota.Storage && mascota.Storage.url) {
            this.avatarUrl = mascota.Storage.url;
          }
        });
    }
  }

  onSubmit() {
    console.log(this.mascotaForm);
    
    if (this.mascotaForm.valid) {
      if (this.isEditMode) {
        // Modo de edición: Actualizar mascota existente
        this.animalRescatadoService
          .actualizarMascota(this.mascotaId!, this.mascotaForm.value)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/refugio/mis-rescatados');
              this.toastr.success('Mascota modificada!');
            },
            error: () => {
              this.toastr.error('Error al modificar mascota')
            }
          }
          );
      } else {
        // Modo de agregar: Crear nueva mascota
        this.animalRescatadoService.crearMascota(this.mascotaForm.value).subscribe({
          next: () => {
            this.router.navigateByUrl('/refugio/mis-rescatados');
            this.toastr.success('Mascota creada exitosamente!');
          },
          error: (error) => {
            this.toastr.error('Error al crear mascota')
          },
        });
      }
    } else {
      this.toastr.warning('Formulario incompleto o incorrecto');
    }
  }

  subirImagen() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('file', file);

      this.storageService.subirImagen(formData).subscribe({
        next: file => {
          this.idStorage = file.data.id
          this.mascotaForm.patchValue({
            idStorage: this.idStorage,
          });
        },
        error: () => {
          this.toastr.error('Error al subir imagen', 'Formato no adecuado')
        }
      })
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
