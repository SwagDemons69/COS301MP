import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { SetChatMessages, SetRecipient} from '@mp/app/chat/util';
import { Select, Store } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
import { Observable } from 'rxjs';
import { profileOtherAPI } from '@mp/app/profile-other/data-access';


@Component({
  selector: 'ms-profile-other-component',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.scss'],
})

export class ProfileOtherComponent {
  @Select(ProfileState.profile) currentUser$!: Observable<user_profile | null>
  
  currentUser: user_profile | null

  @Input() profile: any = {
    username: "Null username",
    email: "null@null.com",
    photoURL: "https://picsum.photos/id/20/300/300",
  };

  constructor (
    private modalController: ModalController,
    private readonly store: Store,
    private navCtrl: NavController,
    private api : profileOtherAPI
  ) 
  {
    this.currentUser = null;
    this.currentUser$.forEach((user) => {
      this.currentUser = user;
    })  
  }

  Status = 1;  
  onInit(){
    for(let i = 0; i < this.profile.user.followers.length; i++){
      if(this.currentUser && this.profile.user.followers[i] === this.currentUser.user_id){
        this.Status = 0;

        return;
      }
    }

    for(let i = 0; i < this.profile.user.followRequests.length; i++){
      if(this.currentUser && this.profile.user.followRequests[i]=== this.currentUser.user_id){
        this.Status = 2;
        return;
      }
    }
    
  }

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
    this.store.dispatch(new SetRecipient({user_id: this.profile.user.user_id, username: this.profile.user.username, pictureUrl: this.profile.user.profilePicturePath}))
    this.store.dispatch(new SetChatMessages(this.profile.user.user_id, this.profile.user.user_id));

    this.modalController.dismiss();

    this.navCtrl.navigateForward('/home/chat');
  }

  async followUser(){
    this.Status = 2;
    if(this.currentUser !== null)
      await this.api.addFollower({requester : this.currentUser, requestee : this.profile});

    if(this.profile.user.isPublic === true){
      this.Status = 0;
    }
    else{
      this.Status = 1;
    }
  }
}