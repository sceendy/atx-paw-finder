import { Component, OnInit } from '@angular/core';

import { Pet } from './pets/pet.interface';
import { PetService } from './pets/pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Paw Finder';
  pets: Array<Object>;
  locations: Array<any>;

  constructor(public petService: PetService) {}

  ngOnInit() {
    this.petService.getPets().subscribe((pets: Pet[]) => {
      pets.forEach(pet => pet.location.human_address = JSON.parse(pet.location.human_address));
      this.pets = pets;
      this.setMapMarkers();
    });
  }

  setMapMarkers() {
    this.locations = this.pets.map((pet: Pet) => {
      return ({ 
        id: pet.animal_id, 
        latitude: Number(pet.location.latitude), 
        longitude: Number(pet.location.longitude),
        typeUrl: pet.type == 'Dog' ? '/assets/dog-color.svg' : '/assets/cat-color.svg'
      })
    });
  }
}
