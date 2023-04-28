import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BlipComponent } from './blip.component';
import { BlipRouting } from './blip.routing';
import { FormsModule } from '@angular/forms';
import { BlipModule as BlipDataModule } from '@mp/app/blip/data-access'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BlipRouting,
    NgxSkeletonLoaderModule,
    FormsModule,
    BlipDataModule
  ],
  declarations: [BlipComponent],
})
export class BlipModule {}
