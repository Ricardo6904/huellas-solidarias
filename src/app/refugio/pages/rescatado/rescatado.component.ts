import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especie, Raza } from '@interfaces/EspecieRaza';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';
import { AuthService } from 'src/app/services/auth.service';
import { EspeciesRazasService } from 'src/app/services/especies-razas.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-rescatado',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rescatado.component.html',
  styleUrl: './rescatado.component.scss'
})
export class RescatadoComponent {
  subscription?: Subscription;
  sexoMascota: string[] = ['Macho', 'Hembra'];
  tamanoMascota: string[] = ['Pequeño', 'Mediano', 'Grande'];
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
    private localStorage: StorageServiceService,
    private especiesRazasService: EspeciesRazasService
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
      idRaza: new FormControl<number | null>({value: null, disabled:true}, Validators.required),
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      tamano: ['', Validators.required],
      historia: [''],
      caracteristica: [''],
      condicion: [''],
      esEsterilizado: [''],
      idStorage: [null],
      idRefugio: this.localStorage.getItem('idRefugio'),
      idEspecie: new FormControl<number | null>({value: null, disabled: false},[Validators.required]),
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
          this.mascotaForm.get('idEspecie')?.setValue(mascota.idEspecie);
          this.avatarUrl = mascota.Storage.url
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
      next: res => {
        this.especieMascota = res
      }
    })
  }

  cargarRazas(event:Event){
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
  onSubmit() {
    
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
