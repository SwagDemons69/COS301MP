import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';
// import { blipAPI } from '@mp/app/blip/data-access'

@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  KronosTimer = KronosTimer;

  newComment = "";
  replyTo: any = null;

  @Input() data: any;
  @Input() metadata: any;

  constructor (
    private modalController: ModalController,
    // private api: blipAPI
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
    if (this.replyTo) {
      this.replyTo.comments.push({
        content: this.newComment,
        created_by: "Gorgorogorogorgorogge",
      });

      this.replyTo = null;
    }
    else
    {
      this.metadata.comments.push({
        content: this.newComment,
        created_by: "Gorgorogorogorgorogge",
        comments: []
      });
    }

    this.newComment = "";
  }

  // likeStatus = false;
  // aysnc likePost(){
  //   if(likeStatus){
  //     const resp = await this.api.likeComment();
  //   }
  //   else{

  //   }
  // }
}