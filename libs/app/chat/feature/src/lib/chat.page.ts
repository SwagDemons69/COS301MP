/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';

interface ChatMessage {
  message: string;
  sender: string;
  timestamp: number;
}

@Component({
  selector: 'chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css']
})
export class ChatPage {
  // constructor() {}
  // messages: ChatMessage[] = [
  //   { message: 'Hello', sender: 'user', timestamp: 123456789 },
  //   { message: 'Hi', sender: 'bot', timestamp: 123456789 },
  //   { message: 'How are you?', sender: 'user', timestamp: 123456789 },
  //   { message: 'I am fine', sender: 'bot', timestamp: 123456789 },
  //   { message: 'What about you?', sender: 'user', timestamp: 123456789 },
  //   { message: 'I am fine too', sender: 'bot', timestamp: 123456789 },
  //   { message: 'What do you do?', sender: 'user', timestamp: 123456789 },
  //   { message: 'I am a bot', sender: 'bot', timestamp: 123456789 },
  // ]
  // sendMessage(message: string) {
  //   this.messages.push({ message, sender: 'user', timestamp: Date.now() });
  // }
  


}