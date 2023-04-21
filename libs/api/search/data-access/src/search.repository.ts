import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { SearchResponse, user, post} from '@mp/api/search/util';
import * as admin from 'firebase-admin';
import { IProfile } from '@mp/api/profiles/util';

@Injectable()
export class SearchRepository {

    async search(query: string): Promise<SearchResponse> {
        const foundUsers = this.GetSearchedUsers(query);
        let profiles: user[] = [];
        let posts: post[] = [];

        for(var user in foundUsers){
          profiles.push();
        }
        var response = {profiles, posts};

        return response;
    }
    
    async GetSearchedUsers(query : string): Promise<any> {
      const handle = await admin.firestore().collection('profiles').get();
      const profiles: admin.firestore.DocumentData[] = [];
      handle.forEach((doc) => {
        if(doc.data()?.['displayName'] === query){
          profiles.push(doc.data());
        }
      });

      if(profiles.length != 0){
        return profiles;
      }
      else return "";
      
    }

    async GetSearchedPosts(query : string): Promise<any> {
      const handle = await admin.firestore().collection('users').get();
      const profiles: admin.firestore.DocumentData[] = [];
      handle.forEach((doc) => {
        if(doc.data()?.['posts'].'post'.'caption' === query){
          const data = doc.data();
          //const name = doc.data().Name;
          profiles.push(doc.data());
        }
      });

      if(profiles.length != 0){
        return profiles;
      }
      else return "";
      
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