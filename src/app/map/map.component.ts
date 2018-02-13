import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as styles from './map-style.json';

@Component({
  selector: 'map',
  template: `
  <agm-map
    [latitude]="lat"
    [longitude]="long"
    [zoom]="zoom"
    [disableDefaultUI]="true"
    [styles]="mapStyles">
    <agm-marker
      *ngFor="let m of markers; let i = index"
      [latitude]="m.latitude"
      [longitude]="m.longitude"
      [iconUrl]="m.typeUrl"
      (markerClick)="getPet(m.id)">
    </agm-marker>
    <agm-circle
      [latitude]="lat"
      [longitude]="long"
      [fillColor]="tomato"
    ></agm-circle>
  </agm-map>
  `
})

export class MapComponent implements OnInit {
  private lat = 30.307182; // atx
  private long = -97.755996; // atx
  private zoom = 10;
  private mapStyles: any;

  @Input() markers: Array<any>;
  @Input() selected: any;
  @Output() onPetSelected = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.mapStyles = styles;
  }

  getPet(id: number) {
    this.onPetSelected.emit(id);
  }
// tslint:disable-next-line:eofline
}