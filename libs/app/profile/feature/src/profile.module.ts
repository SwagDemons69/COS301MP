import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule as ProfileDataAccessModule } from '@mp/app/profile/data-access';
import { ProfileModule as ProfileUiModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { KronosModule } from '@mp/app/kronos-timer/kronos';
import { DashboardModule  as DashData } from '@mp/app/dashboard/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileRouting,
    ProfileUiModule,
    ProfileDataAccessModule,
    NgxSkeletonLoaderModule,
    KronosModule,
    DashData
  ],
  declarations: [ProfilePage],
})
export class ProfileModule {}

