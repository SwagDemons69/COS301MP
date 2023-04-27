import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  KronosTimer = KronosTimer;

  newComment = "";

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

  sendComment() {
    this.metadata.comments.push({
      content: this.newComment,
      created_by: "Gorgorogorogorgorogge",
      comments: []
    });

    this.newComment = "";
  }
}