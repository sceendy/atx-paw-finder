import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IPet } from './pets/pet.interface';
import { PetService } from './pets/pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private title = 'Paw Finder';
  private filterForm: FormGroup;
  private loading: number;
  private results: number;
  public pets: Array<Object>;
  public selectedPet: any;
  public locations: Array<any>;
  public filter: any;

  constructor(
    public fb: FormBuilder,
    public petService: PetService,
    private router: Router
  ) {
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
        const values = Object.values(this.filterForm.value)
          .filter(v => v.length > 0)
          .map(v => v.replace(/\+/g, ' '));
        if (values.length >= 1) {
          return values
            .reverse()
            .join(', ');
        } else {
          return 'all';
        }
      })();
      this.setMapMarkers();
    });
  }

  setMapMarkers() {
    this.loading = 0;
    this.locations = this.pets.map((pet: IPet) => {
      return ({
        id: pet.animal_id,
        latitude: Number(pet.location.latitude),
        longitude: Number(pet.location.longitude),
        typeUrl: pet.type === 'Dog' ? './assets/dog-shadow.svg' : './assets/cat-shadow.svg'
      });
    });
  }

  onSelected(id: any) {
    this.selectedPet = id;
  }

  submitFilter() {
    this.filterForm.controls['animal_id'].setValue('');
    this.renderPetList();
    this.router.navigate(['/'], { queryParams: { page: 1 } });
  }

  clearFilter() {
    this.filterForm.reset({
      'type': '',
      'sex': '',
      'animal_id': ''
    });
    this.renderPetList();
  }

  updateType(type: string) {
    this.filterForm.controls['type'].setValue(type);
  }

  getPet(id: string) {
    this.filterForm.controls['animal_id'].setValue(id);
    this.renderPetList();
  }
}
