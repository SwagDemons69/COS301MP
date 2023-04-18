/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css']
})
export class ChatPage {

  constructor(private navCtrl: NavController) {}

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

  backToMessage() {
    this.navCtrl.navigateBack('/home/messages');
  }

  limitCharactersPerLine() {
    
    // eslint-disable-next-line prefer-const
    let lines = this.newMessage.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 23) {
          let truncatedLine = lines[i].substring(0, 23);
        lines[i] = truncatedLine + '\n' + lines[i].substring(23);
      }
    }
    this.newMessage = lines.join('\n');
  }
  
  
}