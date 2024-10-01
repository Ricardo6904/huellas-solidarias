import { Component } from '@angular/core';

interface Sponsor {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.scss'
})
export class QuienesSomosComponent {
  sponsors: Sponsor[] = [
    { name: 'PetCo', logo: 'https://i.imgur.com/uVpDvzN.png' },
    { name: 'Royal Canin', logo: 'https://i.imgur.com/sxmb5wO.png' },
    { name: 'Purina', logo: 'https://i.imgur.com/2TxdVPP.png' },
    { name: 'Hills', logo: 'https://i.imgur.com/SgXmGne.png' }
  ];

  values: string[] = ['Compasión', 'Integridad', 'Respeto', 'Responsabilidad'];

  registerShelter() {
    console.log('Registrar refugio');
    // Implementar lógica para registrar refugio
  }
}
