import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IPet } from './pet.interface';
import { PetService } from './pet.service';

@Component({
  selector: 'pets-list',
  templateUrl: './pets-list.html'
})

export class PetsListComponent implements OnInit, OnDestroy {
  private params: Object;
  private config = {
    currentPage: 1,
    limit: 4
  };
  public paramsSubs: any;
  @Input() pets: Array<IPet>;
  @Input() onSelected = new EventEmitter<number>();

  constructor(
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSubs = this.route.queryParams.subscribe(queryParams => {
      this.config.currentPage = queryParams.page;
      this.params = queryParams;
    });
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  goToPage(page: number) {
    this.config.currentPage = page;
    this.params = { page };
    this.router.navigate(['/'], { 
      queryParams: this.params,
      queryParamsHandling: 'merge'
    });
  }
}
