import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IPet } from '../pet.interface';

@Component({
  selector: 'pet-card',
  templateUrl: './index.html'
})

export class PetCardComponent {
  @Input() selectedId;
  @Output() toggledInfo = new EventEmitter<number>();
  @Input() pet: IPet;

  constructor() {}

  toggle(id: number) {
    this.toggledInfo.emit(id); 
  }

  // highlightPetLocation(e: Event, id: number) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (id === this.selectedId) {
  //     return;
  //   } else {
  //     this.selectedId = id;
  //     this.onSelected.emit(id);
  //   }
  // }
}