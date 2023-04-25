import { Injectable } from '@angular/core';
import { doc, docData, Firestore , collection, getDocs, query} from '@angular/fire/firestore';

import { Functions, httpsCallable } from '@angular/fire/functions';
import {   user_profile } from '@mp/api/profiles/util';

import { CreateChatMessageRequest, CreateChatMessageResponse, GetChatMessagesRequest, GetChatMessagesResponse } from '@mp/api/chat/util';


@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  chats$(id: string) {
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



//   posts$(id: string) {
//     console.log("FIRESTORE POST")
//     const docRef = doc(this.firestore,`posts/${pId}`).withConverter<post>({
//       fromFirestore: (snapshot) => { return snapshot.data() as post; },
//       toFirestore: (it: post) => it,});
//     return docData(docRef, { idField: 'id' });
//   }



  

//==========================================================================
// CLOUD FUNCTIONS
//==========================================================================

    async getChatMessages(request: GetChatMessagesRequest){
        return await httpsCallable<GetChatMessagesRequest, GetChatMessagesResponse>(this.functions, 'GetChatMessages')(request);
    }

    async sendChatMessage(request : CreateChatMessageRequest){
        return await httpsCallable<CreateChatMessageRequest, CreateChatMessageResponse>(this.functions, 'SendChatMessage')(request);
    }


//     async getPosts(request: GetPostsRequest){
//     return await httpsCallable<GetPostsRequest, GetPostsResponse>(this.functions, 'GetPosts')(request);
//    }

//   async EditProfile(request: EditProfileRequest){
//     return await httpsCallable<EditProfileRequest, EditProfileResponse>(this.functions, 'EditProfile')(request);
//   }

//   async UploadProfilePhotoToCloudStorage(request: AddPhotoRequest){
//     return await httpsCallable<AddPhotoRequest, AddPhotoResponse>(this.functions, 'AddPhotoToCloudStorage')(request);
//   }
}
