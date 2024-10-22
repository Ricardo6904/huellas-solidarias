import { Component, HostListener, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { StorageServiceService } from '../../services/storage-service.service';

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

  constructor(public authService: AuthService, private cookie:CookieService, private storageService:StorageServiceService) {


  }


  ngOnInit(){
    //document.addEventListener('click', (event) => this.closeUserMenu(event));
    this.email = this.storageService.getItem('email')
    this.nombre = this.storageService.getItem('nombre')
  }

  logout() {
    this.authService.logout();
  }

  estaLogead() {
    return this.authService.estaLogeado()
  }

  rol() {
    if(this.storageService.getItem('rol')){
      return this.storageService.getItem('rol')
    }
    return ""
  }

  onToggleMenu() {
    const navList = document.querySelector('.nav-links')
    navList?.classList.toggle('top-[9%]')
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
