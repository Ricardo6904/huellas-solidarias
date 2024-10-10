import { Component, HostListener, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavFixed = false;
  menuOpen = false;
  userMenuOpen = false;
  email:any
  nombre:any

  constructor(private authService: AuthService, private cookie:CookieService) {
    this.email = this.cookie.get('email')
    this.nombre = this.cookie.get('nombre')
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Fijar el encabezado de navegación si el desplazamiento vertical es mayor que 0
    this.isNavFixed = window.pageYOffset > 0;
  }

  ngOnInit(){
    //document.addEventListener('click', (event) => this.closeUserMenu(event));
  }

  logout() {
    this.authService.logout();
  }

  estaLogead() {
    return this.authService.estaLogeado()
  }

  rol() {
    if(this.cookie.get('rol')){
      return this.cookie.get('rol')
    }
    return ""
  }

  onToggleMenu() {
    const navList = document.querySelector('.nav-links')
    navList?.classList.toggle('top-[9%]')
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen

  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  // Método para cerrar el menú cuando haces click fuera
  closeUserMenu(event: any) {
    const userMenu = document.querySelector('#user-dropdown');
    if (userMenu && !userMenu.contains(event.target)) {
      this.userMenuOpen = false;
    }
  }


}
