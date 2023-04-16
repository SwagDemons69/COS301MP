import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { AddPhotoRequest, AddPhotoResponse } from '@mp/api/post/util';
import { Functions, httpsCallable } from '@angular/fire/functions';
import * as admin from 'firebase-admin';
//import { FirebaseStorage , ref, uploadBytes} from '@angular/fire/storage';
//import { AngularFireStorageModule  } from '@angular/fire/storage';
import {
    connectStorageEmulator,
    getStorage,
    provideStorage,
    ref,
    uploadBytes
} from '@angular/fire/storage';

@Injectable()
export class PostApi {
    constructor(private readonly functions: Functions) {}

    async UploadPostToCloudStorage(request: AddPhotoRequest){
        return await httpsCallable<AddPhotoRequest, AddPhotoResponse>(this.functions, 'AddPostToCloudStorage')(request);
    }

    // async UploadPostToFirestore(){
    //     return await httpsCallable<
    // }

}