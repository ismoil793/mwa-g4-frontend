import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment.development";
import {IAuto} from "../interfaces/IAuto";

@Injectable({
  providedIn: 'root'
})

export class AutoCrudService {
  private http = inject(HttpClient)
  state = new BehaviorSubject({})

  addAutomobile(automobile: IAuto) {
    return this.http.post<any>(`${environment.rootUrl}/automobiles`, automobile)
  }

  getAutoById(id: string) {
    return this.http.get<any>(`${environment.rootUrl}/automobiles/${id}`)
  }

  updateAutoById(id: string, automobile: IAuto) {
    return this.http.put<any>(`${environment.rootUrl}/automobiles/${id}`, automobile)
  }

  uploadAutoImages(id: string, images: any) {
    return this.http.post<any>(`${environment.rootUrl}/automobiles/${id}/upload`, images)
  }

  deleteAutomobile(id: string) {
    return this.http.delete<any>(`${environment.rootUrl}/automobiles/${id}`)
  }

  constructor() { }
}
