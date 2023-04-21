import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MessagesPage } from './messages.page';
import { MessagesRouting } from './messages.routing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ChatCardModule } from '../ui-components/chat-card/chat-card.module';
// import { ChatPage } from '@mp/app/chat/feature';


@NgModule({
  imports: [ChatCardModule, CommonModule, IonicModule, MessagesRouting],
  exports: [MessagesPage],
  declarations: [MessagesPage],
})
export class MessagesModule {}
