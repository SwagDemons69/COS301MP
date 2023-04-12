import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatPage } from './chat.page';
import { ChatRouting } from './chat.routing';

@NgModule({
  imports: [CommonModule, IonicModule, ChatRouting],
  exports: [ChatPage],
  declarations: [ChatPage],
})
export class ChatModule{
}