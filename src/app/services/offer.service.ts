import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IOfferRes, IUpdateRes } from '../Model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  rootUrL = environment.rootUrl;
  constructor(private http: HttpClient) {}

  public getAllOfferByAutoId(autoId: string | null) {
    return this.http.get<{ success: boolean; data: IOfferRes }>(
      this.rootUrL + '/automobiles/' + autoId + '/offers'
    );
  }
  public offerRejected(
    autoId: string | null,
    offerId: string,
    body: { status: string }
  ) {
    return this.http.put<{ success: boolean; data: IUpdateRes }>(
      this.rootUrL + '/automobiles/' + autoId + '/offers/' + offerId,
      body
    );
  }
  public offerApproved(
    autoId: string | null,
    offerId: string,
    body: { status: string }
  ) {
    return this.http.put<{ success: boolean; data: IUpdateRes }>(
      this.rootUrL +
        '/automobiles/' +
        autoId +
        '/offers/' +
        offerId +
        '/approved',
      body
    );
  }
}
