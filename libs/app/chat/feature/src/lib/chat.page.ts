/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/providers/nav-controller';
import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css']
})
export class ChatPage {

  @ViewChild(IonContent, { static: true })
  content!: IonContent;
  @ViewChild('messageList', { static: true }) messageList: any;

  messages: { text: string; sent: boolean; sender: string }[] = [];
  newMessage = '';
  sender = 'Me'; 
  receiver = 'John';

  text1 = this.messages.push({ text: "Hi, it's John", sent: false, sender: this.receiver });
  text2 = this.messages.push({ text: "Hi John, how are you?", sent: true, sender: this.sender });

  displayReceiver() : string { 
    return this.receiver; //displays John in ion-title
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage.trim(), sent: true, sender: this.sender });
      this.newMessage = '';
    } 
  }
  
}