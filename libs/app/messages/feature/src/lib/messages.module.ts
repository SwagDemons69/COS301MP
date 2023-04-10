import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MessagesPage } from './messages.page';
import { MessagesRouting } from './messages.routing';
import { ChatCardModule } from '../ui-components/chat-card';

@NgModule({
  imports: [ChatCardModule, CommonModule, IonicModule, MessagesRouting],
  exports: [MessagesPage],
  declarations: [MessagesPage],
})
export class MessagesModule {}
