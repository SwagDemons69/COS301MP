import { Injectable } from '@angular/core';
import { doc, docData, Firestore , collection} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {  EditProfileRequest, EditProfileResponse, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util'
import { AddPhotoRequest, AddPhotoResponse } from '@mp/api/post/util';

import { getStorage, ref, getDownloadURL } from "firebase/storage";


const pId = "1";

@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profile$(id: string) {
    const docRef = doc(
      this.firestore,
      `profiles/${id}`
    ).withConverter<user_profile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as user_profile;
      },
      toFirestore: (it: user_profile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }



  posts$(id: string) {
    console.log("FIRESTORE POST")
    const docRef = doc(this.firestore,`posts/${pId}`).withConverter<post>({
      fromFirestore: (snapshot) => { return snapshot.data() as post; },
      toFirestore: (it: post) => it,});
    return docData(docRef, { idField: 'id' });
  }

  // async getPostContentFromCloudStorage(images: string[]){
  //   console.log("IN PROFILE APP API")
  //   const urls:string[] = [];
  //   const storage = getStorage();
  //   console.log(images)
  //   console.log(images.length)
  //   if(images.length > 0){
  //     for(let i = 0; i < images.length; i++){
  //       console.log("@@@@@@@@@@")
  //       console.log(images[i])
  //       // const imageRef = ref(storage, images[i]);
  //       // const url= await getDownloadURL(imageRef);
  //       // urls.push(url);
  //       // console.log("URL " + (i+1) + ": " + url);
  //     }
  //   }
  //   //const starsRef = ref(storage, 'images/stars.jpg');
  // }
  

  // allposts$(user_id : string){
  //   const docRef = doc(this.firestore, 'profiles/${user_id}/posts').withConverter<post[]>({
  //     fromFirestore: (snapshot) => {return snapshot.data() as post[]; },
  //     toFirestore: (it: post[]) => it,})
  //   return docData(docRef,{});
  // }

//==========================================================================
// CLOUD FUNCTIONS
//==========================================================================

  async EditProfile(request: EditProfileRequest){
    return await httpsCallable<EditProfileRequest, EditProfileResponse>(this.functions, 'EditProfile')(request);
  }

  async UploadProfilePhotoToCloudStorage(request: AddPhotoRequest){
    return await httpsCallable<AddPhotoRequest, AddPhotoResponse>(this.functions, 'AddPhotoToCloudStorage')(request);
  }
}
