import { Component, OnDestroy, OnInit } from '@angular/core';

import { AutoMobileService } from '../../services/auto-mobile.service';
import { IAutoMobile } from '../../Model/automobile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-automobiles',
  templateUrl: './my-automobiles.component.html',
  styleUrls: ['./my-automobiles.component.css'],
})
export class MyAutomobilesComponent implements OnInit, OnDestroy {
  myAutomobiles: IAutoMobile[] = [];
  private subscription!: Subscription;

  constructor(private autoMobileService: AutoMobileService) {}

  ngOnInit() {
    this.subscription = this.autoMobileService.getMyAutoMobiles().subscribe(
      (result: { data: IAutoMobile[] }) => {
        if (result.data.length > 0) {
          this.myAutomobiles = result.data;
        }
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}