import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { edit_profile, user_profile, EditProfilePhotoRequest } from '@mp/api/profiles/util';
import { AddPhotoRequest } from '@mp/api/post/util';
import { AlertController, ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { ProfilesApi, ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { post } from '@mp/api/home/util';
import { Store } from '@ngxs/store';
import { EditProfile, InitForm, GetImages } from '@mp/app/profile/util';
import { UpdateFormValue } from '@ngxs/form-plugin';
import {
  setTimeout,
} from 'timers/promises';
import { NavController } from '@ionic/angular';

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
  blob: Blob;
  profileImage: string;
  user : user_profile
  posts : post[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private readonly store : Store,
    private readonly api: ProfilesApi,
    private readonly navCtrl: NavController
  )
  {
    
    this.userForm = this.formBuilder.group({
      notPublic: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      file: [''],
      bio: ['', Validators.required],
      province: ['', Validators.required]
    });
    this.postIndex = [];
    this.profileImage = "";

    const data: user_profile = {
      user_id: "",
      timeOfExpiry: 0,
      notPublic: "",
      username: "",
      name: "",
      profilePicturePath: "",
      bio: "",
      email: "",
      password: "",
      province: "",
      likesLeft: 0,
      dislikesLeft: 0,
      commentLikesLeft: 0,
      followers:     [],
      following:     [],
      blocked:       [],
      posts:         [],
      notifications: [] 
    }
    this.user = data;

    this.profile$.forEach((user) => {
      if(user && user.posts){
        //Default Profile Image
        this.profileImage = (user.profilePicturePath == "")? "https://ionicframework.com/docs/img/demos/avatar.svg" : user.profilePicturePath;
        //console.log(this.profileImage)
        const len = user.posts.length;
        this.user = user;
      }
    })
    this.blob = new Blob();
    this.posts = [];
    this.postIndex = [];
  }

  async ionViewDidEnter(){
    this.posts = await this.setPosts();
    //Same functionality as python 'for i in range(len): push(i)'
    this.postIndex = [...Array(this.posts.length).keys()];
  }
  
  isEditingProfile = false;
  addedFile = false;

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

  async setPosts(){
    const posts = await this.api.getPosts({ user: this.user.user_id});

    return posts.data.posts;
  }


  //Problem - could updating profile and not adding photo remove link from profile for pold photo
  //"Its a feature"  LOL
  onFileChange(event: any){
    this.blob = event.target.files[0];
    this.addedFile = true;
  }

  //Send Profile Image to Cloud Storage an return url
  async addToCloudStorage(){
    //Convert to Base64
    const str: string = await this.blobToDataURL(this.blob);
    const url: string = str.substring(str.indexOf(',')+1);
    //Create Request
    const request : AddPhotoRequest = { file : url, fileName : this.blob.name};
    //Add Image to Google Cloud Storage and return path to image in storage
    const response = await this.api.UploadProfilePhotoToCloudStorage(request);
    return response.data.pathToImage;
    
  }

  //Convert Image to Base64
  async blobToDataURL(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async updateProfile() {
    //alert(JSON.stringify(this.userForm.value, null, 2));
    this.isEditingProfile = false;
    // const postsTemp = await this.api.getPosts({ user: this.user.user_id});
    // const posts = postsTemp.data.posts;
    // this.posts = posts;
    // console.log("LENGTH: " + this.posts.length)
    // console.log(this.posts[0].content);
    // this.postIndex = [...Array(this.posts.length).keys()];
    
    //Parse form is to queryable JSON object
    const JSONFORM : edit_profile = JSON.parse(JSON.stringify(this.userForm.value, null, 2));

    //Data Validation so profile is not overwritten
    const notPublic = (JSONFORM.notPublic == "") ? "DO-NOT-MODFIY" : JSONFORM.notPublic;
    const name = (JSONFORM.name == "") ? "DO-NOT-MODFIY" : JSONFORM.name;
    const username = (JSONFORM.username == "") ? "DO-NOT-MODFIY" : JSONFORM.username;
    const profilePicturePath = (!this.addedFile) ? "DO-NOT-MODFIY" : (await this.addToCloudStorage());
    const bio = (JSONFORM.bio == "") ? "DO-NOT-MODFIY" : JSONFORM.bio;
    const province = (JSONFORM.province == "") ? "DO-NOT-MODFIY" : JSONFORM.province; 
  
    const newForm: edit_profile = {
      notPublic : notPublic,
      name : name,
      username : username,
      profilePicturePath : profilePicturePath,
      bio : bio,
      province : province
    };
    //console.log(newForm)

    this.store.dispatch(new InitForm(newForm));
    this.store.dispatch(new EditProfile());
    this.addedFile = false;
  }

  goToMessages() {
    this.navCtrl.navigateForward('/home/chat'); // <-- use NavController to navigate to messages page
  }
}
