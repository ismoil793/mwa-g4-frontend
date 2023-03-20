import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAutoMobile } from '../Model/automobile.model';
import { AutoMobileService } from '../services/auto-mobile.service';

@Component({
  selector: 'app-search-near-by',
  templateUrl: './search-near-by.component.html',
  styleUrls: ['./search-near-by.component.css'],
})
export class SearchNearByComponent {
  autoCards: IAutoMobile[] = [];
  priceFilterParams: { min: number; max: number } = { min: 0, max: 0 };
  private subscription!: Subscription;
  constructor(
    private activatedRouter: ActivatedRoute,
    private autoMobileService: AutoMobileService
  ) {}

  ngOnInit() {
    console.log('SearchNearByComponent ngOnInit');
    this.subscription = this.autoMobileService
      .searchNearByAutoMobiles()
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
  }

  trackByFn(index: number, item: IAutoMobile) {
    return item._id;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
