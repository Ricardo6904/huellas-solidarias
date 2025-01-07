import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PrimeNG, PrimeNGConfigType } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'huellas-solidarias';

  constructor(private primengConfig: PrimeNG) { }

  ngOnInit(): void {
    this.primengConfig.ripple.set(true);       //enables core ripple functionality

    
  }



}
