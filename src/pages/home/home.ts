import { Component , OnInit, Inject} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {DishProvider} from '../../providers/dish/dish';
import {Leader} from '../../shared/leader';
import {Promotion} from '../../shared/promotion';
import {LeaderProvider} from '../../providers/leader/leader';
import {PromotionProvider} from '../../providers/promotion/promotion';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  dish: Dish;
  leader: Leader;
  promotion: Promotion;
  dishErrMess: string;
  leaderErrMess: string;
  promoErrMess: string;


  constructor(public navCtrl: NavController, private dishProvider: DishProvider,
              @Inject('BaseURL') private baseURL, private promotionProvider: PromotionProvider, private leaderProvider: LeaderProvider) {

  }
  ngOnInit() {
    this.dishProvider.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
    this.leaderProvider.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
    this.promotionProvider.getFeaturedPromotion()
      .subscribe(promo => this.promotion = promo,
        errmess => this.promoErrMess = <any>errmess);
  }



}
