import { user_profile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { AddPhotoResponse } from '@mp/api/post/util';

@Injectable()
export class PostRepository {

    async AddPhoto(file: string, fileName : string): Promise<AddPhotoResponse> {
    console.log("PHOTO REPO WITH FILE: " + fileName)
    // admin.initializeApp({ projectId: 'twenty4-f9f8e' });
    // const app = admin.app();
    //console.log("I")

    //const storage = getStorage();
    const storage = getStorage(initializeApp({projectId: 'twenty4-f9f8e', 
                                               storageBucket : 'twenty4-f9f8e.appspot.com'}));
    connectStorageEmulator(storage, "localhost", 5006);
    const photosRef = ref(storage,`photos/${fileName}`);

    const snapshot = await uploadString(photosRef, file, 'base64');
    return { pathToImage: snapshot.metadata.fullPath };
    // return new Promise<AddPhotoResponse>((resolve,reject) => {
    //     const snapshot = uploadString(photosRef, file, 'base64');
    //     snapshot.then = () => resolve(snapshot.)
    // });
    }
}

// async blobToDataURL(blob: Blob): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });

// return uploadString(photosRef, file, 'base64').then((snapshot) => { 
//     console.log('Uploaded a base64 string!');
//     console.log(typeof snapshot.ref);
//     const JSONFORM : JSON = JSON.parse(JSON.stringify(snapshot.ref, null, 2));
//     console.log(snapshot.metadata.fullPath)
// });