import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  loading = false;
  recuperarForm: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService, private toastr:ToastrService, private router:Router) {
    this.recuperarForm = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  recuperarContrasena() {
    if (this.recuperarForm.valid) {
      this.loading = true;
      const email = this.recuperarForm.get('email')?.value;
    console.log(email);
    
      this.authService.recuperarContrasena(email).subscribe({
        next: (res:any) => {
          this.loading = false;
          this.toastr.success(
            'Se ha enviado tu contraseña a tu correo electrónico',
            'Recuperación de Contraseña'
          );
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error(
            'No se pudo enviar la contraseña. Verifica tu correo electrónico.',
            'Error'
          );
        },
      });
    } else {
      this.recuperarForm.markAllAsTouched();
    }
  }
}
