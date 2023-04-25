import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { CommonModule } from '@angular/common'


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

  getNumFollowers(){
    return this.profile.user.followers.length;
  }

  getNumPosts(){
    return this.profile.posts.length;
  }

  getNumFollowing(){
    return this.profile.user.following.length;
  }

  async openBlip(data: any, name: any) {
    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data,
        user : name
      }
    });
  }

  goToMessages() {
    return;
  }
}