import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePostLikeRequest } from '@mp/api/post/util';
import { user_profile } from '@mp/api/profiles/util';
import { blipAPI } from '@mp/app/blip/data-access';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'ms-blip-component',
  templateUrl: './blip.component.html',
  styleUrls: ['./blip.component.scss'],
})

export class BlipComponent {
  KronosTimer = KronosTimer;
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;

  deathTime: number
  profile: user_profile | null

  newComment = "";
  replyTo: any = null;

  @Input() data: any;
  @Input() metadata: any;

  constructor(
    private modalController: ModalController,
    private api: blipAPI
  ) {
    this.deathTime = 0;
    setTimeout(() => {
      console.log(this.data);
      console.log(this.metadata);
    }, 500);

    this.profile = null;
    this.profile$.forEach((profile) => {
      this.profile = profile;
      if (this.profile) {
        this.deathTime = this.profile?.timeOfExpiry
      }
    });
  }

  kronos = ""

  // kronosTimer = setInterval(() => {
  //   const counter = this.deathTime - Date.now()/1000;
  //   this.kronos = KronosTimer.displayKronos(counter);
  // }, 999)

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
    else {
      this.metadata.comments.push({
        content: this.newComment,
        created_by: "Gorgorogorogorgorogge",
        comments: []
      });
    }

    this.newComment = "";
  }

  //likeStatus = false;
  async likePost() {
    if (this.profile) {
      const request: CreatePostLikeRequest = {
        liker_id: this.profile.user_id,
        post: this.data.post_id,
        poster_id: this.data.user_id
      }

      const resp = await this.api.likeComment(request);
      this.data.likes = resp.data.likes;
      //console.log(resp)

    }
  }
}