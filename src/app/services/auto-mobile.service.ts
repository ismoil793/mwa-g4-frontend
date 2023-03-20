import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

import { IAutoMobile, IPurchased } from './../Model/automobile.model';
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

  public searchAutoMobiles(searchcQuery: string) {
    return this.http.post<{ data: IAutoMobile[] }>(
      this.rootUrL + '/automobiles/search',
      { search_query: searchcQuery }
    );
  }

  public searchNearByAutoMobiles() {
    console.log('AutoMobileService.searchNearByAutoMobiles()');
    return this.http.get<{ data: IAutoMobile[] }>(
      this.rootUrL + '/automobiles/search/nearby'
    );
  }

  public getPurchased() {
    return this.http.get<{ data: IPurchased[] }>(
      this.rootUrL + '/automobiles/purchased'
    );
  }
}
