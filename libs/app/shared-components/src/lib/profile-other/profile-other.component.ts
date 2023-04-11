import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-profile-other',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.scss'],
})
export class ProfileOtherComponent {
  // @Input() modelTitle: string;

  constructor(
    private modalController: ModalController
  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
