/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { ChatCard } from '../ui-components/chat-card';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { searchmodalPage } from '../../../../search-modal/feature/src/lib/search-modal.page';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'messages-page',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage {

  searchTerm = '';
  items: any[] = [
    { avatar: "https://shorturl.at/qtGLZ", name: 'Will Turner', time: 'Mon', snippet: "The problem is not the problem. The problem is your attitude about the problem." },
    { avatar: "https://shorturl.at/ftM36", name: 'Mr Gibbs', time: 'Tues', snippet: "You seem somewhat familiar. Have I threatened you before?" },
    { avatar: "https://shorturl.at/yHJMR", name: 'Jack Sparrow', time: 'Wed', snippet: "I'm Captain Jack Sparrow, savvy?"},
    { avatar: "https://shorturl.at/osyUY", name: 'Amber Head', time: 'Satu', snippet: "Why is the rum always gone? I need a huge pint of it, or I'll stab you." }
  ];
  filteredItems: any[] = [];

  constructor(private navCtrl: NavController, private modalController: ModalController) {
    this.initializeItems();
  }

  async openSearchModal(){
    const modal = await this.modalController.create({
      component: searchmodalPage,
    });
    return await modal.present();
  }

  initializeItems() {
    this.filteredItems = this.items;
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

  goToDetails(item: any) {
    // Navigate to details page with item as a parameter
    this.navCtrl.navigateForward('/home/chat');
  }

}
