import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';
import { NotificationsRouting } from './notifications.routing';


@NgModule({
  imports: [CommonModule, IonicModule, NotificationsRouting],
  exports: [NotificationsPage],
  declarations: [NotificationsPage],
})
export class NotificationsModule{}