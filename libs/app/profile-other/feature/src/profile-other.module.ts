import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProfileOtherComponent } from './profile-other.component';
import { ProfileOtherRouting } from './profile-other.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileOtherRouting,
    ProfileModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [ProfileOtherComponent],
})
export class ProfileOtherModule {}
