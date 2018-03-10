import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html'
})

export class ModalComponent {
  @Input() petId;
  @Input() show: boolean;
  @Output() close = new EventEmitter();

  constructor() {}

  closeModal() {
    this.close.emit();
  }
}