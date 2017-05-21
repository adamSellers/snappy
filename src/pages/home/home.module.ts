/**
 * Created by adza on 20/05/17.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule
  ],
  exports: [
    HomePage
  ]
})

export class HomePageModule {}
