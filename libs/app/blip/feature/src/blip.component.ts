import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  KronosTimer = KronosTimer;

  JSON = JSON;
  @Input() data: any;
  @Input() metadata: any;

  constructor (
    private modalController: ModalController
  ) {
    setTimeout(() => {
      console.log(this.data);
      console.log(this.metadata);
    }, 500);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  goToMessages() {
    return;
  }
}