import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'map',
  template: `
  <agm-map [latitude]="lat" [longitude]="long" [zoom]="zoom">
    <agm-marker
      *ngFor="let m of markers; let i = index"
      [latitude]="m.latitude"
      [longitude]="m.longitude"
      [iconUrl]="m.typeUrl">
    </agm-marker>
  </agm-map>
  `
})
export class MapComponent implements OnInit{
  private lat = 30.307182;
  private long = -97.755996;
  private zoom = 11;
  @Input() markers: Array<any>;
  
  constructor() {}

  ngOnInit() {
    console.log(this.markers);
  }
}