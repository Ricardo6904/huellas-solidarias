import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaService } from '../../../services/mascota.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.scss'
})
export class AgregarComponent {
  edadMascota = '';

  sexoMascota: string[] = ['Macho','Hembra']
  tamanoMascota: string[] = ['Pequeño', 'Mediano', 'Grande'];
  razas: string[] = ['Labrador', 'Pastor Alemán', 'Bulldog', 'Chihuahua', 'Mestizo'];
  edades = [
    { age: 'Cachorro', description: 'Cachorro (0-1 año)' },
    { age: 'Joven', description: 'Joven (1-3 años)' },
    { age: 'Adulto', description: 'Adulto (3-7 años)' },
    { age: 'Mayor', description: 'Mayor (7+ años)' }
  ];

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;

  idStorage: number | undefined;

  mascotaForm!: FormGroup;

  mascotaId!: number | null;
  isEditMode: boolean = false;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private mascotasService: MascotaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router)
    { }

  ngOnInit() {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('idMascota'));

    this.isEditMode = !!this.mascotaId;

    this.mascotaForm = this.formBuilder.group({
      nombreMascota: ['', Validators.required],
      razaMascota: ['', Validators.required],
      sexoMascota: ['', Validators.required],
      edadMascota: ['', Validators.required],
      tamanoMascota: ['', Validators.required],
      historiaMascota: [''],
      caracteristicaMascota: [''],
      condicionMascota: [''],
      esEsterilizado: [''],
      idStorage: ['', Validators.required],
      idRefugio: this.authService.getIdRefugio()
    });

    if (this.isEditMode) {
      this.mascotasService.obtenerMascotasPorId(this.mascotaId).subscribe(mascota => {
        this.mascotaForm.patchValue(mascota);
        if (mascota.Storage && mascota.Storage.urlStorage) {
          this.avatarUrl = mascota.Storage.urlStorage;
        }
      });
    }
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      if (this.isEditMode) {
        // Modo de edición: Actualizar mascota existente
        this.mascotasService.actualizarMascota(this.mascotaId!, this.mascotaForm.value).subscribe(res => {
          console.log('Mascota actualizada:', res);
          this.router.navigateByUrl('/mascotas/listar');
        }, error => {
          console.log('Error al actualizar la mascota:', error);
        });
      } else {
        // Modo de agregar: Crear nueva mascota
        this.mascotasService.crearMascota(this.mascotaForm.value).subscribe(res => {
          console.log('Mascota registrada:', res);
          this.router.navigateByUrl('/mascotas/listar');
        }, error => {
          console.log('Error al registrar la mascota:', error);
        });
      }
    } else {
      window.alert('Formulario incompleto o incorrecto');
    }
  }


  subirImagen() {
    this.fileInput?.nativeElement.click()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('myfile', file);

      this.storageService.subirImagen(formData).subscribe(file => {
        console.log(file.data);
        this.idStorage = file.data.idStorage

        //Actualiza el campo idStorage en el formulario
        this.mascotaForm.patchValue({
          idStorage: this.idStorage
        });

      });



      reader.onload = () => {
        this.avatarUrl = reader.result

      }

      reader.readAsDataURL(file)

    }
  }


  onChange(){
    console.log(this.edadMascota);

  }


}
