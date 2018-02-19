import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IPet } from './pet.interface';
import { PetService } from './pet.service';

@Component({
  selector: 'pets-list',
  templateUrl: './pets-list.html'
})

export class PetsListComponent implements OnInit {
  private params: Object;
  private config = {
    currentPage: 1,
    limit: 4
  };
  @Input() pets: Array<IPet>;
  @Output() onSelected = new EventEmitter<number>();

  constructor(
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.config.currentPage = queryParams.page;
    });
  }

  goToPage(page: number) {
    this.config.currentPage = page;
    this.params = { page: page };
    this.router.navigate(['/'], { queryParams: this.params });
  }
}
