import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  refugioForm: any;
  isEditMode: any;
  constructor(private fb:FormBuilder){
    this.crearForm()
  }
  crearForm(){
    this.refugioForm = this.fb.group({
      id: [0],
      nombre: [''],
      direccion: [''],
      ciudad: [''],
      provincia: [''],
      celular: [''],
      email: [''],
      redesSociales: ['']
    })
  }
  uploadLogo(){

  }
  onFileSelected(event:any){

  }
}
