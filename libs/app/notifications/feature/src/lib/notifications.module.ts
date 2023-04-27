import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';
import { NotificationsRouting } from './notifications.routing';
import {NotificationsApi} from '@mp/app/notifications/data-access'


@NgModule({
  imports: [CommonModule, IonicModule, NotificationsRouting],
  exports: [NotificationsPage],
  declarations: [NotificationsPage],
  providers: [NotificationsApi]
})
export class NotificationsModule{}