import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verification-success',
  imports: [RouterLink],
  templateUrl: './verification-success.component.html',
  styleUrl: './verification-success.component.scss'
})
export class VerificationSuccessComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    /* const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
    try {
      const decodedToken = JSON.parse(atob(token!.split('.')[1]));
      
      if (decodedToken.verificado) {
      } else {
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      this.router.navigate(['/auth/login']);
    } */
      const encodedToken = this.route.snapshot.queryParamMap.get('token');

      if (!encodedToken) {
        this.router.navigate(['/auth/login']); // Redirigir si no hay token
        return;
      }
  
      try {
        // Decodificar el token (revertir encodeURIComponent)
        const token = decodeURIComponent(encodedToken);
  
        // Decodificar el payload del JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
  
        // Verificar si el usuario está verificado
        if (payload.verificado) {
          // El usuario está verificado, puedes proceder
          console.log('Usuario verificado:', payload);
        } else {
          // Redirigir si no está verificado
          this.router.navigate(['/auth/login']);
        }
      } catch (error) {
        console.error('Error al procesar el token:', error);
        this.router.navigate(['/auth/login']); // Redirigir en caso de error
      }
  }
}
