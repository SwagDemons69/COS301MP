import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-profile-other-component',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.scss'],
})

export class ProfileOtherComponent {
  @Input() profile: any = {
    username: "Null username",
    email: "null@null.com",
    photoURL: "https://picsum.photos/id/20/300/300",
  };

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