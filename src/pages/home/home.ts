import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, ModalController, Platform} from 'ionic-angular';
import {PhotoModel} from '../../models/photo-model';
import {SimpleAlertProvider} from '../../providers/simple-alert/simple-alert';
import {DataProvider} from '../../providers/data/data';
import {Camera} from '@ionic-native/camera';
import {File} from '@ionic-native/file';

//so typescript knows about cordova
declare var cordova;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //define our properties first
  photoTaken: boolean = false;
  loaded: boolean = false;
  photos: PhotoModel[] = [];

  constructor(public navCtrl: NavController, public simpleAlert: SimpleAlertProvider,
              public alertCtrl: AlertController, public modalCtrl: ModalController,
              public dataService: DataProvider, public platform: Platform, public camera: Camera,
              public file: File) {

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.loadPhotos();
    });

    this.platform.resume.subscribe(() => {
      if (this.photos.length > 0) {
        let today = new Date();

        if (this.photos[0].date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
          this.photoTaken = true;
        } else {
          this.photoTaken = false;
        }
      }
    });
  }

  /*The buildData() function is to insert TEST DATA only!
   * be sure to remove this prior to deployment ;)
   */

  buildData() {

    this.photos = [
      new PhotoModel('http://placehold.it/100x100', new Date(2017, 4, 12)),
      new PhotoModel('http://placehold.it/100x100', new Date(2017, 4, 13)),
      new PhotoModel('http://placehold.it/100x100', new Date(2017, 4, 14))
    ];

    this.save();

  }

  playSlideshow(): void {

    if (this.photos.length > 1) {
      //pop the modal as there are photos to display

      let modal = this.modalCtrl.create('SlideshowPage', {photos: this.photos});
      modal.present();

    } else {
      let alert = this.simpleAlert.createAlert('Take more photos!', 'you need at least 2 photos for a slideshow..');
      alert.present();
    }

  }

  removePhoto(photo): void {

    let today = new Date();

    if (photo.date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
      this.photoTaken = false;
    }

    let index = this.photos.indexOf(photo);

    if (index > -1) { //photo exists in array, we can delete it

      this.photos.splice(index, 1);
      this.save();

       }

  }

  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();

  }

  takePhoto(): any {

    //handle if photo has already been taken today
    if (this.photoTaken || !this.loaded) {
      //photo exists today
      console.log('already have photo today');

      return false;

    }

    //handle if not on a device

    if (!this.platform.is('cordova')) {
      console.log('you can only take photos on a device!');
      return false;

    }

    //let's take some photos!
    let options = {
      quality: 100,
      destinationType: 1, //return a path to the image on the device
      sourceType: 1, //use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 1, //front facing camera
      saveToPhotoAlbum: true //save a copy to the user's photo album as well
    };

    this.camera.getPicture(options).then((imagePath) => {
      //work with the image taken by the camera
      //first, grab the filename
      let currentName = imagePath.replace(/^.*[\\\/]/, '');

      //create a new fileName
      let d = new Date(),
        n = d.getTime(),
        newFilename = n + '.jpg';

      if (this.platform.is('ios')) {

        //move the file to permanent storage
        this.file.moveFile(cordova.file.tempDirectory, currentName,
          cordova.file.dataDirectory, newFilename).then((success: any) => {

          //operation successful, so..
          this.photoTaken = true;
          this.createPhoto(success.nativeURL);
          this.sharePhoto(success.nativeURL);
        }, (err) => {
          let alert = this.simpleAlert.createAlert('Shit!', 'Something went wrong..');

          alert.present();
        });

      } else {

        this.photoTaken = true;
        this.createPhoto(imagePath);
        this.sharePhoto(imagePath);

      }


    }, (err) => {
      //throw an alert from the alert service
      let alert = this.simpleAlert.createAlert('Shit!', 'Something went wrong..');

      alert.present();

    });

  }

  loadPhotos(): void {
    //the loadPhotos method is called on platform.ready in ionViewDidLoad().
    //call the getData() method from the data service - this
    //returns a promise so we handle that and any errors..
    this.dataService.getData().then((photos) => {

      let savedPhotos:any = false;

      if (typeof(photos) != 'undefined') {

        savedPhotos = JSON.parse(photos);

      }

      if (savedPhotos) {
        //we have images returned, so loop and add them to photos array
        savedPhotos.forEach(savedPhoto => {
          this.photos.push(new PhotoModel(savedPhoto.image, new Date(savedPhoto.date)));
        });
      }

      if (this.photos.length > 0) {
        let today = new Date();

        if(this.photos[0].date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
          this.photoTaken = true;
        }
      }

      this.loaded = true;

    }, (err) => {
      //use the alert service to throw the error
      let alert = this.simpleAlert.createAlert('Shit!', 'Photos cannot be loaded');
      alert.present();
    });

  }

  sharePhoto(photo): void {
    console.log('image path is: ' + photo);

  }

  save(): void {
    this.dataService.save(this.photos);


  }

}
