import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Simple Alert class will be used to handle the boilerplate building
  of the alert function
*/
@Injectable()
export class SimpleAlertProvider {

  constructor(public alertCtrl: AlertController) {
    console.log('Hello SimpleAlertProvider Provider');
  }

  createAlert(title: string, message: string) {

    return this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

  }

}
