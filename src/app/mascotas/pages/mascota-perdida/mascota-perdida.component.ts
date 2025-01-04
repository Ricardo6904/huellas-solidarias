import { Component } from '@angular/core';
import { Mascota } from '@interfaces/Mascota';

interface LostPet {
  id: number;
  name: string;
  species: string;
  location: string;
  lostDate: string;
  description: string;
  imageUrl: string;
}
@Component({
    selector: 'app-mascota-perdida',
    imports: [],
    templateUrl: './mascota-perdida.component.html',
    styleUrl: './mascota-perdida.component.scss'
})
export class MascotaPerdidaComponent {
  lostPets: LostPet[] = [];
  filteredPets: LostPet[] = [];
  searchTerm: string = '';
  selectedSpecies: string = '';
  selectedLocation: string = '';

  ngOnInit() {
    // Simular carga de datos
    this.lostPets = [
      {
        id: 1,
        name: 'Max',
        species: 'Perro',
        location: 'Zona Norte',
        lostDate: '2023-04-15',
        description: 'Labrador dorado, collar azul, muy amigable.',
        imageUrl: 'https://via.placeholder.com/300x200'
      },
      {
        id: 2,
        name: 'Luna',
        species: 'Gato',
        location: 'Zona Sur',
        lostDate: '2023-04-20',
        description: 'Gata siamesa, ojos azules, tímida.',
        imageUrl: 'https://via.placeholder.com/300x200'
      }
    ];
    this.filteredPets = this.lostPets;
  }

  applyFilters() {
    this.filteredPets = this.lostPets.filter(pet =>
      pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedSpecies === '' || pet.species === this.selectedSpecies) &&
      (this.selectedLocation === '' || pet.location === this.selectedLocation)
    );
  }
}
