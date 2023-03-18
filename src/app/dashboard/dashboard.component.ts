import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAutoMobile } from '../Model/automobile.model';
import { AutoMobileService } from '../services/auto-mobile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  autoCards: IAutoMobile[] = [];
  private subscription!: Subscription;
  constructor(
    private router: Router,
    private autoMobileService: AutoMobileService
  ) {}

  ngOnInit() {
    this.subscription = this.autoMobileService.getAutoMobile().subscribe(
      (result: { data: IAutoMobile[] }) => {
        console.log(result);
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
    this.subscription.unsubscribe();
  }
}
