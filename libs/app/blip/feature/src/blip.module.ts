import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BlipComponent } from './blip.component';
import { BlipRouting } from './blip.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BlipRouting,
    NgxSkeletonLoaderModule,
  ],
  declarations: [BlipComponent],
})
export class BlipModule {}
