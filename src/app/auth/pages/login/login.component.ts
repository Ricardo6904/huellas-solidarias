import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../interfaces/Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router:Router) {
    this.loginForm = this.formBuilder.group({
      correo: new FormControl(''),
      clave: new FormControl('')
    })
  }

  login(usuarioData: Auth) {
    this.authService.login(usuarioData).subscribe(response => {
      //this.authService.guardarToken(response.data.token)
      this.router.navigateByUrl('/mascotas/listar')
    }, error => {
      console.log('Algo salió mal: ', error);
    })
  }

}
