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
      email: new FormControl(''),
      clave: new FormControl('')
    })
  }

  login() {
    console.log();

    this.authService.login(this.loginForm.value).subscribe(response => {
      //this.authService.guardarToken(response.data.token)
      //this.authService.setUsuario(response)
      console.log(response);

      this.router.navigateByUrl('/mascotas/listar')
    }, error => {
      console.log('Algo salió mal: ', error);
    })
  }

}
