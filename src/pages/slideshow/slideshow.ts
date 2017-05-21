import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SlideshowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slideshow',
  templateUrl: 'slideshow.html',
})
export class SlideshowPage {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;

  imagePlayerInterval: any;
  photos: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

    //here is where the photos attribute gets data passed into it.
    this.photos = this.navParams.get('photos');

  }

  ionViewDidEnter() {
    this.playPhotos();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  playPhotos() {
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    //clear any interval already set
    clearInterval(this.imagePlayerInterval);

    //restart
    this.imagePlayerInterval = setInterval(() => {
      if (i < this.photos.length) {
        imagePlayer.src = this.photos[i].image;
        i++;
      } else {
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);

  }

}
