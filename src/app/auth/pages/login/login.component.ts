import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../interfaces/Auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginMsg: string = '';
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      clave: new FormControl(''),
    });
  }

  login() {
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading=false
        this.router.navigateByUrl('/amigos-rescatados').then(() => {
          this.toastr.success('Bienvenido', 'Adopta Huellas');
          window.location.reload();
        });
      },
      error: (error) => {
        this.loginForm.markAllAsTouched();
        this.loginMsg = 'Correo o contraseña incorrectos';
      },
    });

  }
}
