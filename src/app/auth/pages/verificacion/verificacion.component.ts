import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificacion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.scss'
})
export class VerificacionComponent {
  verificacionForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.verificacionForm = this.fb.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  verificarCodigo() {
    if (this.verificacionForm.invalid) {
      return;
    }

    this.loading = true;
    const codigo = this.verificacionForm.get('codigo')?.value;
    const token = localStorage.getItem('token')!; 
    //TODO 

    this.authService.verificarCodigo(token, codigo).subscribe({
      next: () => {
        this.toastr.success('Código verificado correctamente');
        this.router.navigate(['/verification-success']);
      },
      error: (error:any) => {
        this.toastr.error(error.error.message || 'Error al verificar el código');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  reenviarCodigo() {
    const token = localStorage.getItem('token')!; // Obtén el email del localStorage

    this.authService.reenviarCodigo(token).subscribe({
      next: () => {
        this.toastr.success('Código reenviado correctamente');
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'Error al reenviar el código');
      },
    }); 
  }
}
