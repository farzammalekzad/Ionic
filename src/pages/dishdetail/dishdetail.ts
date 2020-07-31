import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {Comment} from '../../shared/comment';
import {FavoriteProvider} from '../../providers/favorite/favorite';
import {CommentPage} from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController,
              private actionSheet: ActionSheetController,
              public modalCtrl: ModalController,
              @Inject('BaseURL') private baseURL,
              private favoriteProvider: FavoriteProvider) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteProvider.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorite() {
    console.log('Adding to Favorite', this.dish.id);
    this.favorite = this.favoriteProvider.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }
  action() {
    let action = this.actionSheet.create({
      title: 'Select Action',
      buttons: [
      {
        text: 'Add to Favorites',
        role: 'Adding',
        handler: () => {
          this.addToFavorite();
        }

      },
      {
        text: 'Add a Comment',
        role: 'comment',
        handler: () => {
          let modal = this.modalCtrl.create(CommentPage);
          modal.onDidDismiss(data => {
            console.log(data);
            data.date = Date.now();
            this.dish.comments.push(data);
          });
          modal.present();
        }
       },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel Action Sheet');
        }
      }
      ]
    });
    action.present();
  }

}
