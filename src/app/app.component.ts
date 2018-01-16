import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IPet } from './pets/pet.interface';
import { PetService } from './pets/pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Paw Finder';
  filterForm: FormGroup;
  pets: Array<Object>;
  selectedPet: any;
  locations: Array<any>;
  loading: number = 5;
  results: number;
  filter: any;
  currentLocation: any;

  constructor(public fb: FormBuilder, public petService: PetService) {
    this.filterForm = this.fb.group({
      'type': '',
      'sex': '',
      'animal_id': ''
    });
  }

  ngOnInit() {
    this.loading = 25;
    this.renderPetList();
  }

  renderPetList() {
    this.loading = 50;
    this.petService.getPets(this.filterForm.value).subscribe((pets: IPet[]) => {
      pets.forEach(pet => pet.location.human_address = JSON.parse(pet.location.human_address));
      this.pets = pets;
      this.loading = 75;
      this.results = pets.length;
      this.filter = (() => {
        let values = Object.values(this.filterForm.value).filter(v => v.length > 0).map(v => v.replace(/\+/g, ' '));
        if (values.length >= 1) {
          values
            .reverse()
            .join(',');
          return values;
        } else {
          return 'all';
        }
      })();
      this.setMapMarkers();
      this.clearFilter();
    });
  }

  setMapMarkers() {
    this.locations = this.pets.map((pet: IPet) => {
      this.loading = 0;
      return ({ 
        id: pet.animal_id, 
        /* TODO: get pet looks_like string to appear as label on marker hover */
        latitude: Number(pet.location.latitude), 
        longitude: Number(pet.location.longitude),
        typeUrl: pet.type == 'Dog' ? '/assets/dog-shadow.svg' : '/assets/cat-shadow.svg'
      })
    });
  }

  onSelected(id: any) {
    this.selectedPet = id;
  }

  clearFilter() {
    this.filterForm.reset({
      'type': '',
      'sex': '',
      'animal_id': ''
    });
  }

  updateType(type: string) {
    this.filterForm.controls['type'].setValue(type);
  }

  getPet(id: string) {
    this.filterForm.controls['animal_id'].setValue(id);
    this.renderPetList();
  }
}
