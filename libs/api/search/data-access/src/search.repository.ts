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
        // const foundPosts = this.GetSearchedPosts(query);
        let profiles: user[] = [];
        let posts: post[] = [];

        // for(let i = 0; i < foundUsers.length; i++){
        //   var content = user[i].displayName;
        //   var bio = user[i].bio;
        //   var photoURL = user[i].username;
        //   var profileId = user[i].user_id;
        //   profiles.push({content, bio, photoURL, });
        // }
        var response = {profiles, posts};

        return response;
    }
    
    async GetSearchedUsers(query : string) {
      const handle = await admin.firestore().collection('profiles').get();
      const profiles: user[] = [];
      handle.forEach((doc) => {
        if(doc.data()?.['displayName'] === query){
          profiles.push()
        }
      });

      return profiles;
    };

    getStringValue(value: any): string {
      return value.toString();
    }
    //### Not working, try subcollections ###
    // async GetSearchedPosts(query : string): Promise<any> {
    //   const handle = await admin.firestore().collection('users').get();
    //   const returnedPosts: post[] = [];
    //   handle.forEach((doc) => {
    //     const p = doc.data()?.collection('posts');
    //     p.forEach((p2) => {
    //       if(p2.['caption'] === query){
    //         posts.push({})
    //       }
    //     })
    //   });
      
    //   return returnedPosts; 
    // }
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