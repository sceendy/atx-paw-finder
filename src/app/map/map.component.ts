import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'map',
  template: `
  <agm-map [latitude]="lat" [longitude]="long" [zoom]="zoom">
    <agm-marker
      *ngFor="let m of markers; let i = index"
      [latitude]="m.latitude"
      [longitude]="m.longitude"
      [iconUrl]="m.typeUrl"
      (markerClick)="getPet(m.id)">
    </agm-marker>
    <agm-circle [latitude]="lat" [longitude]="long" [fillColor]="tomato"></agm-circle>
  </agm-map>
  `
})
export class MapComponent {
  private lat = 30.307182; // atx
  private long = -97.755996; // atx
  private zoom = 10;

  @Input() markers: Array<any>;
  @Input() selected: any;
  @Output() onPetSelected = new EventEmitter<number>();

  constructor() {}

  getPet(id: number) {
    this.onPetSelected.emit(id);
  }
}