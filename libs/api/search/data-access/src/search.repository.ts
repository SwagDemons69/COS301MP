import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { SearchResponse} from '@mp/api/search/util';
import * as admin from 'firebase-admin';

@Injectable()
export class SearchRepository {

    async search(query: string): Promise<SearchResponse> {
        const storage = getStorage(initializeApp({projectId: 'twenty4-f9f8e',  storageBucket : 'twenty4-f9f8e.appspot.com'}));
        const bucket = admin.storage().bucket();
        const title = 'temp title';
        const desc = 'temp desc';
        const img = 'temp path';


        //to get a photo:

        // connectStorageEmulator(storage, "localhost", 5006);
        // const photosRef = ref(storage,`photos/${fileName}`);
        // const snapshot = await uploadString(photosRef, file, 'base64');

        // const file2 = await bucket.file(snapshot.metadata.fullPath).makePublic();
        // const url = bucket.file(snapshot.metadata.fullPath).publicUrl();


        return { title: title, desc: desc, img: img };
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