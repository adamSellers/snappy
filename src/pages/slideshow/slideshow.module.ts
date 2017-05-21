import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideshowPage } from './slideshow';

@NgModule({
  declarations: [
    SlideshowPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideshowPage),
  ],
  exports: [
    SlideshowPage
  ]
})
export class SlideshowPageModule {}
