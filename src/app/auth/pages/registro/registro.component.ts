import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
    provincias: any = ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Tungurahua']

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router) {

  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
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
      console.error('Formulario inválido. Por favor, complete correctamente todos los campos.');
    }
  }
}
