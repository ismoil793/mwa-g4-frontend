import { Injectable, inject } from '@angular/core';
import { ILoginRes, IUser } from '../Model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private httpClient = inject(HttpClient);
  private profileUrl = environment.rootUrl + '/profile';

  constructor() {}

  updateUser(longitude: number, latitude: number): Observable<ILoginRes> {
    const res = this.httpClient.put<ILoginRes>(this.profileUrl, {
      location: [longitude, latitude]
    });
    console.log('updateUser()-res: ', res);
    return res;
  }
}
