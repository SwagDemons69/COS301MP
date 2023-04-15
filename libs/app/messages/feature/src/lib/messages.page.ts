/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ChatCard } from '../ui-components/chat-card';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { searchmodalPage } from '../../../../search-modal/feature/src/lib/search-modal.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage {

  constructor(private modalController: ModalController) {}
  
  async openSearchModal(){
    const modal = await this.modalController.create({
      component: searchmodalPage,
    });
    return await modal.present();
  }
}