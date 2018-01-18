import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PetsListComponent } from './pets/pets-list.component';
import { MapComponent } from './map/map.component';

import { PetService } from './pets/pet.service';

// VENDOR
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

// SECRET
import { APIKEY } from './secret';

const appRoutes: Routes = [
  {
    path: ':page',
    component: AppComponent
  },
  { path: '',
    component: AppComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PetsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: APIKEY
    })
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
