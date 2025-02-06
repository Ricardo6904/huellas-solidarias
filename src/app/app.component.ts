import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoadingScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Adopta Huellas';
  isLoading: boolean = true; // Controla si la pantalla de carga está visible

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Simula la verificación de autenticación
    /* setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga
    }, 5000);  */
    this.authService.isAuthenticatedScreen().subscribe((isAuthenticated) => {
      this.isLoading = false; // Oculta la pantalla de carga
    });
  }
}
