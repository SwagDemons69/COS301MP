import { Component, Input} from '@angular/core';
// import { ChatPage } from '@mp/app/chat/feature';

@Component({
  selector: 'chat-card',
  templateUrl: './chat-card.html',
  styleUrls: ['./chat-card.css']
})
export class ChatCard {
  @Input() name: String = "";
  @Input() profilePhoto: String = "";
  @Input() snippet: String = "";
  @Input() time: String = "";
}
