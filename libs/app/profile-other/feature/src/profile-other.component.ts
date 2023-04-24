import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { Select } from '@ngxs/store';

@Component({
  selector: 'ms-profile-other-component',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.scss'],
})

export class ProfileOtherComponent {
  // @Input modelTitle: string;

  constructor (
    private modalController: ModalController
  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}