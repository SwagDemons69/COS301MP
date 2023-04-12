import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { post } from '@mp/api/home/util';

@Component({
  selector: 'ms-blip',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})
export class BlipComponent {
  @Input() data: post = {
    post_id: "NONE",
    user_id: "",
    content: "",
    caption: "Oops! This post could not be loaded.",
    likes: 0,
    timeStamp: 0,
    shares: 0,
    kronos: 0,
    comments: [],
    categories: [],
    taggedUsers: []
  };

  constructor(
    private modalController: ModalController
  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}