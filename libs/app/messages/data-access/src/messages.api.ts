import { Injectable } from '@angular/core';
import { doc, docData, Firestore , collection, getDocs, query} from '@angular/fire/firestore';

import { Functions, httpsCallable } from '@angular/fire/functions';
import {  EditProfileRequest, EditProfileResponse, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util'
import { AddPhotoRequest, AddPhotoResponse, GetPostsRequest, GetPostsResponse } from '@mp/api/post/util';

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDoc, onSnapshot, where } from 'firebase/firestore';
import { ChatHeader, ChatHeadersRequest, ChatHeadersResponse } from '@mp/api/chat/util';
import { Observable } from 'rxjs';
//import { AngularFireStore } from '@angular/fire/firestore';

export interface recip {
    recipient : string;
}

@Injectable()
export class MessagesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  async headers(user: string) {
    const request: ChatHeadersRequest = { user: user};
    const chats = await httpsCallable<ChatHeadersRequest, ChatHeadersResponse>(this.functions, 'ChatHeaders')(request);
    return chats.data.chats;
  }

  




    headers$(id: string) {
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

//   profile$(id: string) {
//     const docRef = doc(
//       this.firestore,
//       `profiles/${id}`
//     ).withConverter<user_profile>({
//       fromFirestore: (snapshot) => {
//         return snapshot.data() as user_profile;
//       },
//       toFirestore: (it: user_profile) => it,
//     });
//     return docData(docRef, { idField: 'id' });
//   }

  
}