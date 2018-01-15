import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PetsListComponent } from './pets/pets-list.component';
import { MapComponent } from './map/map.component';

import { PetService } from './pets/pet.service';

// VENDOR
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PetsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADXe5_gSopqsoAva8mtLwSP9a7xB45dvk'
    })
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
