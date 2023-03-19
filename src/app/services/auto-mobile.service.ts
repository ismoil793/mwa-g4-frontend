import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { IAutoMobile } from './../Model/automobile.model';
@Injectable({
  providedIn: 'root',
})
export class AutoMobileService {
  rootUrL = environment.rootUrl;
  constructor(private http: HttpClient) {}

  public getAutoMobile() {
    return this.http.get<{ data: IAutoMobile[] }>(
      this.rootUrL + '/automobiles'
    );
  }

  public getMyAutoMobiles() {
    return this.http.get<{ data: IAutoMobile[] }>(
      this.rootUrL + '/automobiles/myAutomobiles'
    );
  }
}
