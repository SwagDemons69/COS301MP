import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { edit_profile, user_profile } from '@mp/api/profiles/util';
import { AlertController, ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { ProfilesApi, ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { post } from '@mp/api/home/util';
import { Store } from '@ngxs/store';
import { EditProfile, InitForm, GetImages } from '@mp/app/profile/util';
import { UpdateFormValue } from '@ngxs/form-plugin';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(ProfileState.form) form$!: Observable<edit_profile | null>;
  userForm: FormGroup;
  postIndex: number[];

  //postImages : string[]

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private readonly store : Store,
    private readonly api : ProfilesApi
  )
  {
    this.userForm = this.formBuilder.group({
      notPublic: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      profilePicturePath: [''],
      bio: ['', Validators.required],
      province: ['', Validators.required]
    });
    this.postIndex = []
    this.profile$.forEach((user) => {
      if(user && user.posts){
        const len = user.posts.length;
        //Same functionality as python 'for i in range(len): push(i)'
        this.postIndex = [...Array(len).keys()];
        //this.api.getPosts("858L5KxcsV5yAgBQ5bseUk2EhLZe");
      }
    })
    //this.postImages = []

    // this.profile$.forEach((user) => {
    //   if(user && user.posts){
    //     const paths:string[] = [];
    //     // user.posts.forEach((post)=>{
    //     //   paths.push(post.content);
    //     // });
    //     // console.log(paths);
    //     for(let i = 0;i < user.posts.length; i++){
    //       paths.push(user.posts[i].content);
    //     }
    //     console.log(paths)
    //     this.store.dispatch(new GetImages(paths));
    //   }
    // });
  }
  
  isEditingProfile = false;

  // data at the moment expects a json object as follows:
  // {title: "...", desc: "...", img: "..."}
  // TODO: Change this to properly reflect a post object
  // See: blip.component.html
  async openBlip(data: any, name: any) {
    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data,
        user : name
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    });

    return await modal.present();
  }

  

  updateProfile() {
    
    alert(JSON.stringify(this.userForm.value, null, 2));
    this.isEditingProfile = false;
  
    const JSONFORM : edit_profile = JSON.parse(JSON.stringify(this.userForm.value, null, 2));

    const newForm: edit_profile = {
      notPublic : JSONFORM.notPublic,
      name : JSONFORM.name,
      username : JSONFORM.username,
      profilePicturePath : JSONFORM.profilePicturePath,
      bio : JSONFORM.bio,
      province : JSONFORM.province
    };

    this.store.dispatch(new InitForm(newForm));
    this.store.dispatch(new EditProfile());
  }

}
