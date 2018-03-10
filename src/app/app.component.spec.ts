import { TestBed, async } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { PetsListComponent } from './pets/pets-list.component';
import { PetCardComponent } from './pets/pet-card';
import { MapComponent } from './map/map.component';

import { ModalComponent } from './components/modal';

import { PetService } from './pets/pet.service';
import { APIKEY } from './secret';

describe('AppComponent', () => {
  let fixture, app;
  let mockPetService: PetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule, 
        AgmCoreModule, 
        NgxPaginationModule,
        RouterTestingModule,
        AgmCoreModule.forRoot({
          apiKey: APIKEY
        })
      ],
      providers: [PetService],
      declarations: [
        AppComponent, 
        PetsListComponent,
        MapComponent,
        PetCardComponent,
        ModalComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeDefined();
  }));
  it(`should have as title 'Paw Finder'`, async(() => {
    expect(app.title).toEqual('Paw Finder');
  }));
  it('should render title in an anchor tag', async(() => {
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('ATX Paw Finder');
  }));
});
