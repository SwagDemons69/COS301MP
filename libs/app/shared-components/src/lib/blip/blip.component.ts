import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ms-blip',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})
export class BlipComponent {
  @Input() data: any;

  constructor(
    private modalController: ModalController
  ) {
    console.log("DATA:");
    console.log(this.data);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}