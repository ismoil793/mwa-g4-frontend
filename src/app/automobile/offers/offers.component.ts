import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOffer, IOfferRes, IUpdateRes } from 'src/app/Model/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit, OnDestroy {
  autoId: string | null = '';
  title!: string;
  vin!: number;
  offers: IOffer[] = [];
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService
  ) {
    this.autoId = this.route.snapshot.paramMap.get('autoId');
  }

  ngOnInit() {
    this.loadData();
  }

  onClickApproved(offerId: string) {
    if (confirm('Are you sure?')) {
      this.subscription = this.offerService
        .offerApproved(this.autoId, offerId, { status: 'Approved' })
        .subscribe(
          (result: { success: boolean; data: IUpdateRes }) => {
            this.loadData();
          },
          (error: Error) => {
            console.log(error);
          }
        );
    }
  }

  onClickReject(offerId: string) {
    if (confirm('Are you sure?')) {
      this.subscription = this.offerService
        .offerRejected(this.autoId, offerId, { status: 'Rejected' })
        .subscribe(
          (result: { success: boolean; data: IUpdateRes }) => {
            this.loadData();
          },
          (error: Error) => {
            console.log(error);
          }
        );
    }
  }
  trackByFn(index: number, item: IOffer) {
    return item._id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadData() {
    this.subscription = this.offerService
      .getAllOfferByAutoId(this.autoId)
      .subscribe(
        (result: { success: boolean; data: IOfferRes }) => {
          this.title = result?.data?.title;
          this.vin = result?.data?.vin;
          this.offers = result?.data?.offers;
        },
        (error: Error) => {
          console.log(error);
        }
      );
  }
}
