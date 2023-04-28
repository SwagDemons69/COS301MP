import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePostChildCommentRequest, CreatePostLikeRequest, CreatePostRootCommentRequest } from '@mp/api/post/util';
import { user_profile } from '@mp/api/profiles/util';
import { RootComment, ChildComment } from '@mp/api/post/util';
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

  rootCom_id = "";
  async sendComment() {
    if (this.replyTo) {
      if(this.profile){
        let username = "Anonymous";
        if(this.profile.username !== ""){
          username = this.profile.username;
        }

        const child: ChildComment = {
          child_comment_id: "",
          created_by: this.profile.user_id,
          created_by_username: username,
          content: this.newComment,
          kronos : 0,
          likes: 0
        }

        const request: CreatePostChildCommentRequest = {
          user_id: this.data.user_id,
          post_id: this.data.post_id,
          root_comment_id: this.rootCom_id,
          comment : child
        }
        
        const resp = await this.api.addChildComment(request);
        const comms = resp.data;
        this.metadata = []

        this.metadata.comments = comms.post_comments
      }
    }
    else {
      if(this.profile){
        let username = "Anonymous";
        if(this.profile.username !== ""){
          username = this.profile.username;
        }
          
        const children: ChildComment[] = [];
        const root: RootComment = {
          root_comment_id: "",
          created_by: this.profile.user_id,
          created_by_username: username,
          content: this.newComment,
          kronos : 0,
          likes: 0,
          comments: children, 
        }

        const request: CreatePostRootCommentRequest = {
          user_id: this.data.user_id,
          post_id: this.data.post_id,
          comment: root
        }

        const resp = await this.api.addRootComment(request);
        const comms = resp.data;
        this.metadata = []

        this.metadata.comments = comms.post_comments
      }
    }

    this.newComment = "";
  }

  //likeStatus = false;
  async likePost() {
    console.log("In")
    if (this.profile) {
      console.log("JI")
      const request: CreatePostLikeRequest = {
        liker_id: this.profile.user_id,
        post: this.data.post_id,
        poster_id: this.data.user_id
      }
      console.log(request)
      const resp = await this.api.likePost(request);
      this.data.likes = resp.data.likes;
      //console.log(resp)

    }
  }

  dislikes: number = 0;
  async dislikePost() {
    if (this.profile) {
      const request: CreatePostLikeRequest = {
        liker_id: this.profile.user_id,
        post: this.data.post_id,
        poster_id: this.data.user_id
      }
      console.log(request)
      const resp = await this.api.dislikePost(request);
      this.dislikes = resp.data.likes;
    }
  }
}