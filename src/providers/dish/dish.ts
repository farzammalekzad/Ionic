import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable} from 'rxjs';
import { baseURL} from '../../shared/baseurl';
import { ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/delay';
import {catchError, map} from "rxjs/operators";
import {Comment} from '../../shared/comment';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {
 comment: Array<any>

  constructor(public http: HttpClient, private processHttpmsgProvider: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHttpmsgProvider.handleError));

  }
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
}
