import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatCard } from "./chat-card";



@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [ChatCard],
  declarations: [ChatCard],
})
export class ChatCardModule {

}
