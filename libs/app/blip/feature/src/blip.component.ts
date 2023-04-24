import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  @Input() blip: any = {};

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