import { Component, OnInit } from '@angular/core';
import { PetService } from './pet.service';

@Component({
  selector: 'pets-list',
  template: `
  <h2 class="title is-4">Most recently found</h2>
  <div class="card" *ngFor="let pet of pets">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img src="http://petharbor.com/get_image.asp?RES=Detail&ID={{pet.animal_id}}&LOCATION=ASTN" alt="{{pet.type}}">
          </figure>
        </div>
        <div class="media-content">
          <div class="tags">
            <span class="tag">{{pet.type}}</span>
            <span class="tag">{{pet.sex}}</span>
            <span class="tag">{{pet.color}}, {{pet.looks_like}}</span>
            <span class="tag">{{pet.age}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="content is-small">
          <strong>Found at </strong>{{pet.location.human_address.address}}, {{pet.location.human_address.city}}, {{pet.location.human_address.zip}}<br />
          <strong>At AAC? </strong>{{pet.at_aac}}
        </p>
      </div>
    </div>
  </div>
`
})
export class PetsListComponent implements OnInit {
  title = 'Pets List';
  private pets: Array<Object>;

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.getPets().subscribe(pets => {
      pets.forEach(pet => pet.location.human_address = JSON.parse(pet.location.human_address));
      this.pets = pets
    });
  }
}
