import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../interfaces/Auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router:Router,
    private toastr:ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      clave: new FormControl('')
    })
  }

  login() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(response => {
      console.log(response);

      this.router.navigateByUrl('/mascotas/listar').then(()=>{
        //window.location.reload()
        this.toastr.success('Bienvenido', 'Huellas Solidarias')
      })

    }, error => {
      console.log('Algo salió mal: ', error);
    })
  }

}
