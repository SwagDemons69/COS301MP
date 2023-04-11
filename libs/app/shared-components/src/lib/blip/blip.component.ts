import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-blip',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})
export class BlipComponent {
  // @Input() modelTitle: string;

  constructor(
    private modalController: ModalController
  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
