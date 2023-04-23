/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { ChatState } from '@mp/app/chat/data-access';
import { Observable } from 'rxjs';
import { ChatMessage } from '@mp/api/chat/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';

@Component({
  selector: 'chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage {
  @Select(ProfileState.profile) profile$!: Observable< user_profile | null > 
  @Select(ChatState.chats) chats$!: Observable< ChatMessage[] | [] >
  @Select(ChatState.recipient) recipient$!: Observable< string | "" >

  chats: ChatMessage[] | []
  chatsCopy: ChatMessage[] | []
  user: user_profile | null
  recipient: string | ""
  messages: { text: string; sent: boolean; sender: string }[] = [];
  
  constructor(private navCtrl: NavController) 
  {
    this.chats = [];
    this.chatsCopy = [];
    this.chats$.forEach((chats2)=>{
      this.chats = chats2;
      console.log(chats2);
      this.messages = this.loadMessages();
    })
    
    this.user = null;
    this.profile$.forEach((user) => {
      if(user){ this.user = user; }
    });

    this.recipient = "";
    this.recipient$.forEach((recipient) => {
      if(recipient){ this.recipient = recipient; }
    });
  }

  @ViewChild(IonContent, { static: true })
  content!: IonContent;
  //@ViewChild('messageList', { static: true }) messageList: any;

  newMessage = '';
  sender = "Bob" 
  receiver = 'John';


  loadMessages(){

    let chatsCopy2  = [...this.chats];
    chatsCopy2.sort((a, b) => Math.sign(parseInt(a.timeStamp) - parseInt(b.timeStamp)));
    
    this.chats = chatsCopy2;
    const messages: { text: string; sent: boolean; sender: string }[] = []
    
    for(let i = 0;i < this.chats.length; i++){
      const payload = this.chats[i].payload;
      const sent = (this.chats[i].sender == this.user?.user_id);
      const sender = this.chats[i].sender;
      messages.push({text: payload, sent: sent, sender: sender});
    }
    return messages;
  }

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