import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAutoMobile } from '../Model/automobile.model';
import { AutoMobileService } from '../services/auto-mobile.service';

@Component({
  selector: 'app-search-by-text',
  templateUrl: './search-by-text.component.html',
  styleUrls: ['./search-by-text.component.css'],
})
export class SearchByTextComponent {
  autoCards: IAutoMobile[] = [];
  priceFilterParams: { min: number; max: number } = { min: 0, max: 0 };
  private subscription!: Subscription;
  constructor(
    private activatedRouter: ActivatedRoute,
    private autoMobileService: AutoMobileService
  ) {}

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((params) => {
      let searchQuery = params['searchquery'];

      console.log('params searchQuery: ', searchQuery);

      this.subscription = this.autoMobileService
        .searchAutoMobiles(searchQuery)
        .subscribe(
          (result: { data: IAutoMobile[] }) => {
            if (result.data.length > 0) {
              this.autoCards = result.data;
            }
          },
          (error: Error) => {
            console.log(error);
          }
        );
    });
  }

  trackByFn(index: number, item: IAutoMobile) {
    return item._id;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
