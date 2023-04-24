import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  @Input() data: any = { //TODO: Change this to `post` type once integrated
    post_id: "NONE",
    user_id: "",
    content: "",
    caption: "Oops! This post could not be loaded.",
    likes: [],
    timeStamp: 0,
    shares: 0,
    kronos: 0,
    comments: [],
    categories: [],
    taggedUsers: []
  }

  constructor (
    private modalController: ModalController
  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  goToMessages() {
    return;
  }
}