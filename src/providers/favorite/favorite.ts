import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Dish} from '../../shared/dish';
import {DishProvider} from '../dish/dish';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorite: Array<any>

  constructor(public http: HttpClient, private dishService: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorite = [];
  }
  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorite.push(id);
      return true;
    }
  }
  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
      .map(dishes => dishes.filter(dish => this.favorite.some(el => el === dish.id)));
  }
  isFavorite(id: number): boolean {
    return this.favorite.some(el => el === id);
  }
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorite.indexOf(id);
    if (index>=0) {
      this.favorite.splice(index , 1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-exist favorite', id);
      return Observable.throw('Deleting non-exist favorite '+ id);
    }
  }
}
