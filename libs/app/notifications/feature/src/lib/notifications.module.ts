import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule as ProfileUiModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotificationsPage } from './notifications.page';
import { NotificationsRouting } from './notifications.routing';
import { KronosModule } from '@mp/app/kronos-timer/kronos';
import { NotificationsModule  as NotiData } from '@mp/app/notifications/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotificationsRouting,
    ProfileUiModule,
    NgxSkeletonLoaderModule,
    KronosModule,
    NotiData
  ],
  exports: [NotificationsPage],
  declarations: [NotificationsPage],
})
export class NotificationsModule {}