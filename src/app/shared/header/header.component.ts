import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  PLATFORM_ID,
  afterNextRender,
  afterRender,
  inject,
} from '@angular/core';
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
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @HostBinding('class.dark') isDarkMode = false;

  isAuthenticated: boolean = false;
  isNavFixed = false;
  menuOpen = false;
  userMenuOpen = false;
  email: any;
  nombre: any;
  isStateVerified: boolean = false;
  isLoaded:boolean = false

  constructor(
    public authService: AuthService,
    private storageService: StorageServiceService,
    private windowService: WindowService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('antes',this.isStateVerified);
      this.isStateVerified = this.authService.isAuthenticated();
      console.log(this.isStateVerified);
      
      const savedTheme = this.storageService.getItem('theme');
      this.isDarkMode =
        savedTheme === 'dark' ||
        (!savedTheme &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.updateTheme();
    }
  }

  ngOnInit() {
    //document.addEventListener('click', (event) => this.closeUserMenu(event));
    this.email = this.storageService.getItem('email');
    this.nombre = this.storageService.getItem('nombre');
    this.isLoaded = true;
    if (this.authService.isAuthenticated()) this.isStateVerified = true;
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
    return this.authService.estaLogeado();
  }

  rol() {
    if (this.storageService.getItem('rol')) {
      return this.storageService.getItem('rol');
    }
    return '';
  }

  onToggleMenu() {
    this.menuOpen = !this.menuOpen;
    const navList = document.querySelector('.nav-links');
    if (this.menuOpen) {
      navList?.classList.add('top-[9%]'); // Abre el menú
    } else {
      navList?.classList.remove('top-[9%]'); // Cierra el menú
    }
  }
  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  // Escucha los clics en el documento
  @HostListener('document:click', ['$event'])
  closeUserMenu(event: MouseEvent) {
    const userMenu = document.querySelector('#user-dropdown');
    const userMenuButton = document.querySelector('[aria-expanded="false"]');
    const navList = document.querySelector('.nav-links');
    const navMenuButton = document.querySelector('button.sm\\:hidden'); // Selecciona el botón del menú de navegación

    // Verifica si el clic ocurrió fuera del menú desplegable y del botón que lo abre
    if (
      userMenu &&
      !userMenu.contains(event.target as Node) &&
      userMenuButton &&
      !userMenuButton.contains(event.target as Node)
    ) {
      this.userMenuOpen = false;
    }

    // Cierra el menú de navegación si se hace clic fuera de él
    if (
      navList &&
      !navList.contains(event.target as Node) &&
      navMenuButton &&
      !navMenuButton.contains(event.target as Node)
    ) {
      this.menuOpen = false;
      navList.classList.remove('top-[9%]'); // Cierra el menú
    }
  }
}
