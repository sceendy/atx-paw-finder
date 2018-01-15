import { Component, OnInit, Input } from '@angular/core';
import { PetService } from './pet.service';

@Component({
  selector: 'pets-list',
  template: `
  <h2 class="title is-4">Most recently found</h2>
  <div class="card" *ngFor="let pet of pets">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img src="http://petharbor.com/get_image.asp?RES=Detail&ID={{pet.animal_id}}&LOCATION=ASTN" alt="{{pet.type}}">
          </figure>
        </div>
        <div class="media-content">
          <div class="tags">
            <span class="tag">{{pet.type}}</span>
            <span class="tag">{{pet.age}}</span>
            <span class="tag">{{pet.sex}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <strong class="has-text-danger">{{pet.color}}, {{pet.looks_like}}</strong>
        <div class="content">
          <strong>Found at </strong>{{pet.location.human_address.address}} ({{pet.location.human_address.zip}}) on {{pet.intake_date | date: 'MMM d'}} and {{pet.at_aac.charAt(0) === 'Y' ? 'now at the shelter' : 'contact us for info'}}
        </div>
      </div>
    </div>
  </div>
`
})
export class PetsListComponent implements OnInit {
  title = 'Pets List';
  @Input() pets: Array<Object>;

  constructor(private petService: PetService) {}

  ngOnInit() {
    
  }
}
