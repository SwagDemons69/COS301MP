import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatPage } from './chat.page';
import { ChatRouting } from './chat.routing';
import { FormsModule } from '@angular/forms';
import { ChatModule as ChatApiModule } from '@mp/app/chat/data-access';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ChatRouting, ChatApiModule],
  exports: [ChatPage],
  declarations: [ChatPage],
})
export class ChatModule{
}