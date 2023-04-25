/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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


@Component({
  selector: 'post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  postForm : FormGroup
  blob : Blob
  user : string | undefined
  chosenPost: Blob
  chosenPostBase64Data: string
  style: string
  
  //Dont think validators needed
  constructor(private formBuilder: FormBuilder,
              private readonly api : PostApi)
  {
    this.postForm = this.formBuilder.group({
      file: ['', Validators.required],
      caption: ['', Validators.required],
      categories: ['', Validators.required]
    })
    this.blob = new Blob();
    this.profile$.forEach((user) => {this.user = user?.user_id;});
    this.chosenPost = new Blob();
    this.chosenPostBase64Data = "";
    this.style = "hidden"
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
    this.style = "hidden";
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
    
    //Ensure caption and userId are available
    const caption = this.postForm.get("caption")?.value;
    let fillerCaption = "";
    if(caption){
      fillerCaption = caption;
    }
    let fillerUserId = "";
    if(this.user != undefined){
      fillerUserId = this.user;
    }
    
    //Create Post
    const newPost: post = {
      post_id : "test post",
      user_id : fillerUserId,
      content : pathToImage,
      caption : fillerCaption,
      likes : [],
      timeStamp : 696969696,
      shares : 0,
      kronos : 0,
      comments : [],
      categories : [],
      taggedUsers : []
    }
    const request: CreatePostRequest = {post: newPost};
    const responseStatus = await this.api.UploadPostToFirestore(request);
  }

 // async toBase64(blob: Blob /*, callback: (result: string | ArrayBuffer | null, name: string) => void*/) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   reader.onloadend = function() {
    //    // callback(reader.result, blob.name);
    //    return reader.result;
    //   };
    // }

  // sendToStorage(url : string | ArrayBuffer | null, name: string){
  //   url = (typeof url === "string") ? url?.toString().substring(url.indexOf(',') + 1) : null;
  //   if(url){
  //     const request : AddPhotoRequest = { file : url, fileName : name}
  //     this.api.UploadPost(request);
  //   }
  // }

  // fixUrl(url: string | ArrayBuffer | null){
  //   if(typeof url === "string"){
  //     const str = url.substring(url.indexOf(',')+1);
  //     console.log(str)
  //   }
  //   return "ERROR";
  // }

  //const request: AddPhotoRequest = { file : this.blob, fileName : this.blob.name }
    //this.api.UploadPhoto(request);
    //this.toBase64(this.blob)
    
   // try{ const response = (await this.api.UploadPost(request)).data; }
    //catch(error){ console.log("ERROR"); }

  caption = ""
  tags = [
    "", "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"
  ]

  updateTagList() {
    const tagList = document.getElementById("tagList");
    if(tagList == null) return;

    // Remove previous tags
    while(tagList.lastChild) {
      document.removeChild(tagList.lastChild);
    }

    this.tags.forEach(x => x.toLowerCase().trim());
    this.tags.sort();

    let prevTag = "";
    for(let t = 0; t < this.tags.length; t++) {
      const tag = this.tags[t];

      // Skip duplicates and empty strings
      if(tag == prevTag) {
        continue;
      }

      const el = document.createElement("ion-badge");
      el.innerText = "#" + tag;

      tagList?.appendChild(el);

      prevTag = tag;
    }
  }

  onCaptionChanged() {
  }
}
