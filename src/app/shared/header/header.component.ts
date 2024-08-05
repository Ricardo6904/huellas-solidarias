import { Component, HostListener, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavFixed = false;

  constructor(private authService: AuthService) {

   }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Fijar el encabezado de navegación si el desplazamiento vertical es mayor que 0
    this.isNavFixed = window.pageYOffset > 0;
  }

  logout() {
    this.authService.logout();
  }

  estaLogead(){
    return this.authService.estaLogeado()
  }

  isLogged(){
    return this.authService.isLoggedIn()
  }

}
