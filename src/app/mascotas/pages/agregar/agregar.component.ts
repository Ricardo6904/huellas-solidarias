import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.scss'
})
export class AgregarComponent {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  avatarUrl: string | ArrayBuffer | null = null;

  idStorage: number | undefined;

  mascotaForm!: FormGroup;

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private mascotasService:MascotaService) {

  }

  ngOnInit() {
    this.mascotaForm = this.formBuilder.group({
      nombreMascota: [''],
      razaMascota: [''],
      sexoMascota: [''],
      edadMascota: [''],
      tamanoMascota: [''],
      historiaMascota: [''],
      caracteristicaMascota: [''],
      condicionMascota: [''],
      esEsterilizado: [''],
      idStorage: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      console.log(this.mascotaForm.value);
      //Registro de la mascota en la base de datos
      this.mascotasService.crearMascota(this.mascotaForm.value).subscribe( res => {
        console.log(res);

      })
    } else {
      window.alert('Error falta ID')
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




}
