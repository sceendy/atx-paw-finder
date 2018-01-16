import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Pet } from './pet.interface';
import { PetService } from './pet.service';

@Component({
  selector: 'pets-list',
  template: `
  <div class="map__list">
    <div class="card" 
      *ngFor="let pet of pets | paginate: { itemsPerPage: 4, currentPage: p };" 
      (mouseover)="highlightPetLocation($event, pet.animal_id)">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-96x72">
              <img src="http://petharbor.com/get_image.asp?RES=Detail&ID={{pet.animal_id}}&LOCATION=ASTN" alt="{{pet.type}}">
            </figure>
          </div>
          <div class="media-content">
            <strong>{{pet.looks_like}}</strong>
            <div class="content is-small">
              Found at {{pet.location.human_address.address}} ({{pet.location.human_address.zip}}) on {{pet.intake_date | date: 'MMM d'}} <span class="has-text-info actionable__text" (click)="selected = pet.animal_id">(view details)</span>
            </div>
          </div>
        </div>
        <div class="content" *ngIf="selected === pet.animal_id">
          <div class="tags">
            <span class="tag">{{pet.type}}</span>
            <span class="tag">{{pet.color}}</span>
            <span class="tag">{{pet.age}}</span>
            <span class="tag">{{pet.sex}}</span>
            <span class="tag is-info" *ngIf="pet.at_aac.charAt(0) === 'Y'">
              at shelter
            </span>
            <a class="tag is-warning" *ngIf="pet.at_aac.charAt(0) === 'N'" href="http://www.austintexas.gov/department/aac" target="_blank" rel="noopener">
              contact us
            </a>
          </div>
        </div>
      </div>
    </div>
    <pagination-controls 
      (pageChange)="p = $event" 
      class="pagination--bulma"
      previousLabel=""
      nextLabel=""
    >
    </pagination-controls>
  </div>
`
})
export class PetsListComponent {
  selectedId: number;
  p: number = 1;
  @Input() pets: Array<Pet>;
  @Output() onSelected = new EventEmitter<number>();

  constructor(private petService: PetService) {}

  toggleInfo(i: number) {
    if (this.pets[i].show) {
      return delete this.pets[i].show;
    }
    this.pets[i].show = true;
  }

  highlightPetLocation(e: Event, id: number) {
    e.stopPropagation();
    e.preventDefault();
    if (id === this.selectedId) { return; } 
    else {
      this.selectedId = id;
      this.onSelected.emit(id);
    }
  }
}
