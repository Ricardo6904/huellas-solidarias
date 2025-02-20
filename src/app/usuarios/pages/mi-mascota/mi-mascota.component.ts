import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MascotaService } from 'src/app/services/mascota.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mi-mascota',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mi-mascota.component.html',
  styleUrl: './mi-mascota.component.scss'
})
export class MiMascotaComponent {
  sexoMascota = [
    {value: 'macho', text: 'Macho'}, 
    {value: 'hembra', text: 'Hembra'}
  ];
  tamanoMascota = [
    {value: 'pequeño', text: 'Pequeño'},
    {value: 'mediano', text: 'Mediano'},
    {value: 'grande', text: 'Grande'}
  ];
  especieMascota = [
    {value: 'perro', text: 'Perro'}, 
    {value: 'gato', text: 'Gato'}, 
    {value: 'otro', text: 'Otro'}, 
  ];
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
    private router: Router,
    private localStorage:StorageServiceService
  ) {
    this.mascotaForm = this.fb.group({
      nombre: new FormControl<string>('', [Validators.required]),
      especie: new FormControl<string>('', [Validators.required]),
      raza: new FormControl<string>(''),
      edad: new FormControl<string>(''),
      sexo: new FormControl<string>('', [Validators.required]),
      tamano: new FormControl<string>('', [Validators.required]),
      descripcion: new FormControl<string>(''),
      estado: new FormControl<string>('seguro'),
      idStorage: new FormControl<number | null>(null),
      idUsuario: new FormControl<number | null>(Number(this.localStorage.getItem('idUsuario'))), // Este campo se asignará dinámicamente
    });
  }

  ngOnInit(){
   
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditMode = !!this.mascotaId;

    if (this.isEditMode) {
      this.mascotaService
        .obtenerMascotasPorId(this.mascotaId)
        .subscribe((mascota) => {
          console.log(mascota);
          
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
   console.log(mascotaData);


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
