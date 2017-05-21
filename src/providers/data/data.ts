import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Data service that is going to handle the application
  loading and retrieving the data from the file storage.
  Photos are returned as paths to the location on the device
  where the photo is actually stored.
*/

@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {
    console.log('Hello DataProvider Provider');
  }

  getData(): Promise<any> {
    return this.storage.get('photos');
  }

  save(data): void {
    let newData = JSON.stringify(data);
    this.storage.set('photos', newData);
  }

}
