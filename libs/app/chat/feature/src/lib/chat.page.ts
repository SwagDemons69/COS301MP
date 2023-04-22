/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage {

  constructor(private navCtrl: NavController) {}

  @ViewChild(IonContent, { static: true })
  content!: IonContent;
  @ViewChild('messageList', { static: true }) messageList: any;

  newMessage = '';
  sender = 'Me'; 
  receiver = 'John';

  messages: { text: string; sent: boolean; sender: string }[] = [
    { text: "Hi, it's John", sent: false, sender: this.receiver },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
    { text: "Hi John, how are you?", sent: true, sender: this.sender },
  ];

  displayReceiver() : string { 
    return this.receiver; //displays John in ion-title
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage.trim(), sent: true, sender: this.sender });
      this.newMessage = '';
    } 
  }

  backToMessage() {
    this.navCtrl.navigateBack('/home/messages');
  }
}