import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IPet } from '../pet.interface';

@Component({
  selector: 'pet-card',
  templateUrl: './index.html'
})

export class PetCardComponent {
  public selectedId: number;
  @Output() onSelected = new EventEmitter<number>();
  @Input() pet: IPet;

  constructor() {}

  toggleInfo(id: number) {
    if (this.selectedId === id ) {
      this.selectedId = undefined;
    } else {
      this.selectedId = id;
    }
  }

  highlightPetLocation(e: Event, id: number) {
    e.stopPropagation();
    e.preventDefault();
    if (id === this.selectedId) {
      return;
    } else {
      this.selectedId = id;
      this.onSelected.emit(id);
    }
  }
}