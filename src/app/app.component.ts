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
    /* this.primengConfig.ripple.set(true);       //enables core ripple functionality

    //optional configuration with the default configuration
    const config: AppConfig = {
      ripple: false,                      //toggles ripple on and off
      inputStyle: 'outlined',             //default style for input elements
      menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
      theme: 'lara-light-indigo',         //default component theme for PrimeNG
      scale: 14                           //size of the body font size to scale the whole application
    };
    this.layoutService.config.set(config); */
  }



}
