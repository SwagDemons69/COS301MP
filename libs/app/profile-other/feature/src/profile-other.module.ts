import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProfileOtherComponent } from './profile-other.component';
import { ProfileOtherRouting } from './profile-other.routing';
import { ProfileOtherModule as ProfileOtherDataAccessModule } from '@mp/app/profile-other/data-access';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileOtherRouting,
    ProfileOtherDataAccessModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [ProfileOtherComponent],
})
export class ProfileOtherModule {}
