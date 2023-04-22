import { Injectable } from '@angular/core';
import { doc, docData, Firestore , collection, getDocs, query} from '@angular/fire/firestore';

import { Functions, httpsCallable } from '@angular/fire/functions';
import {  EditProfileRequest, EditProfileResponse, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util'
import { AddPhotoRequest, AddPhotoResponse, GetPostsRequest, GetPostsResponse } from '@mp/api/post/util';

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDoc } from 'firebase/firestore';
//import { AngularFireStore } from '@angular/fire/firestore';

@Injectable()
export class MessagesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  
}