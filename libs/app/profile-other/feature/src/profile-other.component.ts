import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app/blip/feature';
import { SetChatMessages, SetRecipient} from '@mp/app/chat/util';
import { Select, Store } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
import { Observable, delay } from 'rxjs';
import { profileOtherAPI } from '@mp/app/profile-other/data-access';
import { ToastController } from '@ionic/angular';
import { DashboardApi } from '@mp/app/dashboard/data-access';
import { Render } from '@nestjs/common';
import { ASYNC_METHOD_SUFFIX } from '@nestjs/common/module-utils/constants';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';
import { post } from '@mp/api/home/util';
@Component({
  selector: 'ms-profile-other-component',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.scss'],
})

export class ProfileOtherComponent {
  @Select(ProfileState.profile) currentUser$!: Observable<user_profile | null>
  
  JSON = JSON;
  
  currentUser: user_profile | null
  followingCount: number
  followerCount: number
  deathTime: number
  currentNotifIf: string

  @Input() profile: any = {
    username: "Null username",
    email: "null@null.com",
    photoURL: "https://picsum.photos/id/20/300/300",
  };

  constructor (
    private modalController: ModalController,
    private readonly store: Store,
    private navCtrl: NavController,
    private api : profileOtherAPI,
    private toastCtrlr: ToastController,
    private readonly dashApi: DashboardApi
  ) 
  {
    this.followingCount = 0;
    this.followerCount = 0;
    this.deathTime = 0;  
    this. currentNotifIf = ""

    this.currentUser = null;
    this.currentUser$.forEach((user) => {
      this.currentUser = user;
      if(user){
        this.followerCount = user?.followers;
        this.followingCount = user?.following;
      }
    })

  }
  kronos = ""
  kronosTimer = setInterval(() => {
    const counter = this.deathTime - Date.now()/1000;
    this.kronos = KronosTimer.displayKronos(counter);
  }, 999)

  Status = 1;  
  async ionViewWillEnter(){ 
    this.deathTime = this.profile.user.timeOfExpiry //Wrong
  //  console.log(this.profile.user.user_id)
    const response = await this.api.getProfileStats({ user: this.profile.user.user_id });
    this.followerCount = response.data.followers.length;
    this.followingCount = response.data.following.length;
   

    // console.log(response)
    //followers = string[]
    //following = string[]
    //followRequests - user[]
    //user = { user: string, image: string};

    this.Status = 1;
    for(let i = 0; i < response.data.followers.length ; i++){
      if(this.currentUser && response.data.followers[i] === this.currentUser.user_id){
        this.Status = 0;
        return;
      }
    }

    for(let i = 0; i < response.data.followRequests.length; i++){
      if(this.currentUser && response.data.followRequests[i].user === this.currentUser.user_id){
        this.Status = 2;
        return;
      }
    }
    
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async openBlip(data: post) {
    const blipData = await this.dashApi.GetBlipContent({ user: data.user_id, post: data.post_id});

    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data,
        metadata: blipData.data
      }
    });

    modal.onDidDismiss().then((data) => {
      //console.log(data);
    });

    return await modal.present();
  }

  // async openBlip(data: any, name: any) {
  //   const modal = await this.modalController.create({
  //     component: BlipComponent,
  //     componentProps: {
  //       data: data,
  //       user : name
  //     }
  //   });
  // }

  goToMessages() {
    //console.log(this.profile.user.user_id + " " + this.profile.user.username, pictureUrl: this.profile.user.profilePicturePath)
    this.store.dispatch(new SetRecipient({user_id: this.profile.user.user_id, username: this.profile.user.username, pictureUrl: this.profile.user.profilePicturePath}))
    if(this.currentUser)
      this.store.dispatch(new SetChatMessages(this.currentUser.user_id, this.profile.user.user_id));

    this.modalController.dismiss();

    this.navCtrl.navigateForward('/home/chat');
  }

  async followUser(){
    let REP = null;
    if(this.currentUser !== null){
      if(this.Status == 2){
        const response = await this.api.addFollower({ notification_id: this.currentNotifIf, requester : this.currentUser, requestee : this.profile.user});
        REP = response;
      }
      else{
        const response = await this.api.addFollower({requester : this.currentUser, requestee : this.profile.user});
        this.currentNotifIf = (response.data.notification_id) ? (response.data.notification_id) : "";
        REP = response
      }
      //onsole.log(response + " " + this.Status)
      if(this.Status == 1){ //follow user
            
          if(this.profile.user.notPublic === false){
            this.Status = 0;
          }
          else{
            this.Status = 2;
          }
          const toast = await this.toastCtrlr.create({
            message: (this.Status == 0) ? `Now Following ${this.profile.user.username}` : "Follow request sent",
            color: 'success',
            duration: 1500,
            position: 'top',
          });
      
          await toast.present();

        }
      else if(this.Status == 0){ //unfollow user
          
          this.Status = 1;
          
          const toast = await this.toastCtrlr.create({
            message: (this.Status == 1) ? `Unfollowed ${this.profile.user.username}` : "Stopped Following",
            color: 'success',
            duration: 1500,
            position: 'top',
          });
      
          await toast.present();
        }
      else if(this.Status == 2){ //cancel follow request
    
          
          
          const toast = await this.toastCtrlr.create({
            message: (this.Status == 2) ? `Cancelled follow request` : "Removed Follow Request",
            color: 'success',
            duration: 1500,
            position: 'top',
          });
      
          await toast.present();
          this.Status = 1;
        }

        delay(500);
        this.followerCount = REP.data.followerCount;
        this.followingCount = REP.data.followingCount;
      }
    }

    async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    
  }

