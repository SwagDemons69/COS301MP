import { Injectable } from '@angular/core';
import { doc, docData, Firestore , collection, getDocs, query} from '@angular/fire/firestore';

import { Functions, httpsCallable } from '@angular/fire/functions';
import {  EditProfileRequest, EditProfileResponse, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util'
import { AddPhotoRequest, AddPhotoResponse, GetPostsRequest, GetPostsResponse } from '@mp/api/post/util';

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDoc } from 'firebase/firestore';
import { ChatHeadersRequest, ChatHeadersResponse } from '@mp/api/chat/util';
//import { AngularFireStore } from '@angular/fire/firestore';

@Injectable()
export class MessagesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  async headers$(user: string){
    const request: ChatHeadersRequest = { user: user};
    const chats = await httpsCallable<ChatHeadersRequest, ChatHeadersResponse>(this.functions, 'ChatHeaders')(request);
    console.log("Headers")
    console.log(chats.data.chats);
    return chats.data.chats;
}

  
}