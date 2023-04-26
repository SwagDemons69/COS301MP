import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  @Input() dat: any;
  data: any = { //TODO: Change this to `post` type once integrated
    post_id: "NONE",
    user_id: "",
    content: "",
    title: "Sorry! No post found",
    desc: "This post could not be loaded.",
    likes: [],
    timeStamp: 0,
    shares: 0,
    kronos: 0,
    comments: [
      {
        user_id: "Arnold Schwarzenegger",
        content: "I'll be back!",
        timeStamp: 0,
        likes: []
      },
      {
        user_id: "Tom Hanks",
        content: "My mama always said life is like a box of chocolates. You never know what you're gonna get.",
        timeStamp: 0,
        likes: []
      },
      {
        user_id: "Some dude",
        content: "Keep the change, ya filthy animal!",
        timeStamp: 0,
        likes: []
      }
    ],
    tags: [],
    taggedUsers: []
  }

  constructor (
    private modalController: ModalController
  ) {
    setTimeout(() => {
      this.data = { ...this.data, ...this.dat }; //TODO: Remove once integrated
    }, 500);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  goToMessages() {
    return;
  }
}