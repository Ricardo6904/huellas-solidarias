import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../interfaces/Auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
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
    

    this.authService.login(this.loginForm.value).subscribe(response => {

      this.router.navigateByUrl('/mascotas/listar').then(()=>{
        this.toastr.success('Bienvenido', 'Huellas Solidarias')
      })

    }, error => {
      console.log('Algo salió mal: ', error);
    })
  }

}
