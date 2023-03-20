import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPurchased } from 'src/app/Model/automobile.model';
import { IOffer } from 'src/app/Model/offer.model';
import { AutoMobileService } from 'src/app/services/auto-mobile.service';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css'],
})
export class PurchasedComponent implements OnInit, OnDestroy {
  purchasedData: IPurchased[] = [];
  private subscription!: Subscription;
  constructor(
    private router: Router,
    private autoMobileService: AutoMobileService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByFn(index: number, item: IPurchased) {
    return item._id;
  }

  private loadData() {
    this.subscription = this.autoMobileService.getPurchased().subscribe(
      (result: { data: IPurchased[] }) => {
        this.purchasedData = result.data;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
