import { Component, HostBinding, HostListener, Inject, PLATFORM_ID, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StorageServiceService } from '../../services/storage-service.service';
import { WindowService } from '../../services/window.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @HostBinding('class.dark') isDarkMode = false;

  isAuthenticated:boolean = false
  isNavFixed = false;
  menuOpen = false;
  userMenuOpen = false;
  email:any
  nombre:any
  isStateVerified:boolean = false

  constructor(
    public authService: AuthService,
    private storageService: StorageServiceService,
    private windowService: WindowService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = this.storageService.getItem('theme');
      this.isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.updateTheme();
    }
  }


  ngOnInit(){
    //document.addEventListener('click', (event) => this.closeUserMenu(event));
    this.email = this.storageService.getItem('email')
    this.nombre = this.storageService.getItem('nombre')

    if(this.authService.isAuthenticated()) this.isStateVerified = true
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.storageService.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  private updateTheme(): void {
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
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
