import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import {Leader} from '../../shared/leader';
import {Observable} from "rxjs";
import {baseURL} from "../../shared/baseurl";
import {catchError, map} from 'rxjs/operators';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient, private processHttpmsgProvider: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders/' + id)
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
  getFeaturedLeader() : Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHttpmsgProvider.handleError));
  }
}
