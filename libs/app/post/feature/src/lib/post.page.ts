/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';
import { PostApi } from '@mp/app/post/data-access';
import { AddPhotoRequest, AddPhotoResponse, CreatePostRequest } from '@mp/api/post/util';
import { read } from 'fs';
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { post } from '@mp/api/home/util';
import { Timestamp } from '@angular/fire/firestore';
import { IonBadge } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @ViewChild('tagList', { read: ViewContainerRef }) tagListElem!: ViewContainerRef;
  @ViewChild('tagBadge', { read: TemplateRef }) tagBadgeElem!: TemplateRef<any>;

  blob : Blob

  user : string | undefined

  chosenPost: Blob;
  chosenPostBase64Data: string;
  desc: string;
  title: string;
  tags = [
    "", "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"
  ]

  style: string;
  
  //Dont think validators needed
  constructor(private readonly api : PostApi, private readonly toastCtrlr: ToastController)
  {
    this.blob = new Blob();
    this.profile$.forEach((user) => {this.user = user?.user_id;});
    this.chosenPost = new Blob();
    this.chosenPostBase64Data = "";
    this.desc = "";
    this.title = "";
    this.style = "hidden";
  }

  //Get reference to file uploaded
  async onFileChange(event : any){
    
    this.blob = event.target.files[0];
    this.chosenPost = event.target.files[0];

    //Convert to Base64
    const str: string = await this.blobToDataURL(this.chosenPost);
    //const url: string = str.substring(str.indexOf(',')+1);
    this.chosenPostBase64Data = str;
    //Show Image
    this.style = "";
  }

  //Hide Image div Each time Post Page is opened
  ionViewWillEnter(){
    this.style="hidden"
  }
  
  //Upload Post on Upload Button Click
  async uploadPost(){
    const path = await this.addToCloudStorage();
    this.addToFirestore(path);
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
  
  //Send Post Image to Cloud Storage an return url
  async addToCloudStorage(){
    //Convert to Base64
    const str: string = await this.blobToDataURL(this.blob);
    const url: string = str.substring(str.indexOf(',')+1);
    //Create Request
    const request : AddPhotoRequest = { file : url, fileName : this.blob.name};
    //Add Image to Google Cloud Storage and return path to image in storage
    const response = await this.api.UploadPostToCloudStorage(request);
    return response.data.pathToImage;
  }

  //Add Post to Firestore
  async addToFirestore(pathToImage: string){
    
    //Create Post
    const newPost: post = {
      post_id:      "test post",
      user_id:      this?.user==undefined?"":this.user,
      title:        this.title,         
      content:      pathToImage,
      desc:         this.removeTagsFromDesc(this.desc),
      likes:        [],
      timeStamp:    696969696,
      shares:       0,
      kronos:       0,
      comments:     [],
      tags:         this.tags,
      taggedUsers:  []
    }
    const request: CreatePostRequest = {post: newPost};
    const responseStatus = await this.api.UploadPostToFirestore(request);
    const toast = await this.toastCtrlr.create({
      message: "Post Created",
      color: 'success',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }

  addTagBadge(content: string) {
    const tagBadge = this.tagBadgeElem.createEmbeddedView({content});
    this.tagListElem.insert(tagBadge);
  }
  
  removeTagsFromDesc(desc: string) {
    return desc.replace(/#[\w]+/g, "");
  }

  extractTagsFromDesc() {
    const res: string[] = []

    this.desc.split(/[\n\r\t ,.]+/).forEach(word => {
        if(word.startsWith("#") && word.length > 1) {
          word.split("#").forEach(subtag => {
          res.push(subtag);
        });
      }
    });

    return res;
  }

  updateTagList() {
    const res = this.extractTagsFromDesc();

    const tagList = document.getElementById("tagList");
    if(tagList == null) return;

    // Remove previous tag elements
    this.tagListElem.clear();

    res.forEach(x => x.toLowerCase().trim());
    res.sort();

    let prevTag = "";
    for(let t = 0; t < res.length; t++) {
      const tag = res[t];

      // Skip duplicates and empty strings
      if(tag == prevTag) {
        continue;
      }

      this.addTagBadge("#" + tag);

      prevTag = tag;
    }

    this.tags = res;
  }

}
