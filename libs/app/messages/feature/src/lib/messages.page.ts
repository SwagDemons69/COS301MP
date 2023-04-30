/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { ChatCard } from '../ui-components/chat-card';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SearchModalPage } from '@mp/app/search-modal/feature';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MessagesState } from '@mp/app/messages/data-access';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ChatHeader } from '@mp/api/chat/util';
import { Store } from '@ngxs/store';
import { SetHeaders} from "@mp/app/messages/util"
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
import { SetChatMessages, SetRecipient, SetUsername } from '@mp/app/chat/util';

@Component({
  selector: 'messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage {

  @Select(MessagesState.headers) headers$! : Observable<ChatHeader[] | [] > 
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  headers : ChatHeader[]
  user : user_profile | undefined
  searchTerm = '';

  items: any[] = [
    { avatar: "https://shorturl.at/qtGLZ", name: 'Will Turner', time: 'Mon', snippet: "The problem is not the problem. The problem is your attitude about the problem." },
    { avatar: "https://shorturl.at/ftM36", name: 'Mr Gibbs', time: 'Tue', snippet: "You seem somewhat familiar. Have I threatened you before?" },
    { avatar: "https://shorturl.at/yHJMR", name: 'Jack Sparrow', time: 'Wed', snippet: "I'm Captain Jack Sparrow, savvy?"},
    { avatar: "https://shorturl.at/osyUY", name: 'Amber Head', time: 'Sat', snippet: "Why is the rum always gone? I need a huge pint of it, or I'll stab you." }
  ];
  filteredItems: any[] = [];

  constructor(private navCtrl: NavController,
              private modalController: ModalController,
              private readonly store: Store) {
    this.initializeItems();
    this.headers = [];
    this.headers$.forEach((headers)=>{
      if(headers){
        this.headers = headers;
      }
    })
    //this.user = undefined;
    this.profile$.forEach((user) => {
      if(user){ this.user = user; }
    });
  }

  async openSearchModal(){
    const modal = await this.modalController.create({
      component: SearchModalPage,
    });
    return await modal.present();
  }

  initializeItems() {
    this.filteredItems = this.headers;
  }

  getItems() {
    // Reset items back to all of the items
    this.filteredItems = this.items;

    // if the search term is not empty, filter the items
    if (this.searchTerm.trim() !== '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
      })
    }
  }

  goToDetails(item: ChatHeader) {
    
    //Set Messages of current contact
    if(typeof this.user == "undefined"){
      alert("message.page.ts - user is undefined")
    }
    else {
      this.store.dispatch(new SetRecipient({user_id: item.user_id, username: item.username, pictureUrl: item.picture}))
      this.store.dispatch(new SetChatMessages(this.user?.user_id, item.user_id));
    }
      // Navigate to details page with item as a parameter
    this.navCtrl.navigateForward('/home/chat');
  }

}
