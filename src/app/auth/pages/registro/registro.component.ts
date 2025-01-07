import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';




@Component({
    selector: 'app-registro',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './registro.component.html',
    styleUrl: './registro.component.scss'
})
export class RegistroComponent {
    provincias: any = ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Tungurahua']

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router, private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      cedula: ['0000000000', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      provincia: [''],
      ciudad: [''],
      direccion: [''],
      rol:['usuario']
    });
  }

  registrar(): void {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe(() => {
        this.router.navigateByUrl('/auth/login')
      })
      console.log(this.registroForm.value); // Envía los datos del formulario al backend para registrar al usuario
      //this.registroForm.reset(); // Reinicia el formulario después de enviar los datos
    } else {
      this.toastr.warning('','Complete los campos requeridos')
    }
  }


}
