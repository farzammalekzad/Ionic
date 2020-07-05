import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Promotion} from '../../shared/promotion';
import { ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import {catchError, map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {baseURL} from '../../shared/baseurl';


/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient, private processHttpmsgProvider: ProcessHttpmsgProvider) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
  getPromotion(id: number) : Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id )
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotion => promotion[0]))
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }

}
