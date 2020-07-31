import { Component, OnInit, Inject } from '@angular/core';
import {IonicPage, ItemSliding, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import {FavoriteProvider} from '../../providers/favorite/favorite';
import {Dish} from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteProvider: FavoriteProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              @Inject('BaseURL') private baseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
  ngOnInit() {
    this.favoriteProvider.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }
   deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want delete favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete canceled');
          }
        },
        {
          text: 'Delete',
          handler:  () => {
            let loading =   this.loadingCtrl.create({
              content: 'Deleting...'
            });
            let toast =   this.toastCtrl.create({
              message: 'Dish '+ id + ' deleted successfully',
              duration: 3000
            });
            this.favoriteProvider.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; toast.present();} ,
                errmess => this.errMess = errmess);

          }
        }
      ]
    });

    alert.present();
    item.close();
  }


}
