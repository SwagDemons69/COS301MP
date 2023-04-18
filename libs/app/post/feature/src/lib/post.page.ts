/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
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
  styleUrls: ['./post.page.css']
})
export class PostPage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  postForm : FormGroup
  file : File
  blob : Blob
  user : string | undefined
  //Dont think validators needed
  constructor(private formBuilder: FormBuilder,
              private readonly api : PostApi)
  {
    this.postForm = this.formBuilder.group({
      file: ['', Validators.required],
      caption: ['', Validators.required]
    })
    this.file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    this.blob = new Blob();
    this.profile$.forEach((user) => {this.user = user?.user_id;});
  }
  //get reference to file uploaded
  onFileChange(event : any){
    this.file = event.target.files[0];
    this.blob = event.target.files[0];
  }

  async uploadPost(){
    const path = await this.addToCloudStorage();
    this.addToFirestore(path);
  }
  

  async blobToDataURL(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

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
    ///////
    //Create Post
    const newPost: post = {
      post_id : "test post",
      user_id : fillerUserId,
      content : pathToImage,
      caption : fillerCaption,
      likes : 0,
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
