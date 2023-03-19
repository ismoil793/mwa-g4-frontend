import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IOfferRes } from '../Model/offer.model';

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
}
