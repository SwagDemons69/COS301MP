import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { SearchResponse, User, Post} from '@mp/api/search/util';
import * as admin from 'firebase-admin';
import { AnyARecord } from 'dns';


// import { Functions } from '@angular/fire/functions';
// import { IProfile } from '@mp/api/profiles/util';
// import { SearchResponse } from '@mp/api/search/util';
@Injectable()
export class SearchRepository {

    async search(query: string): Promise<SearchResponse> {
    

        
        // const foundUsers = this.GetSearchedUsers(query);
        // const foundPosts = this.GetSearchedPosts(query);
  

        // for(let i = 0; i < foundUsers.length; i++){
        //   var content = user[i].displayName;
        //   var bio = user[i].bio;
        //   var photoURL = user[i].username;
        //   var profileId = user[i].user_id;
        //   profiles.push({content, bio, photoURL, });
        // }
        // var response = {profiles : this.GetSearchedUsers(query), posts};

        const profiles: User[] = await this.GetSearchedUsers(query);
        const posts: Post[] = await this.GetSearchedPosts(query);

        return {profiles : profiles, posts : posts};
    }
    
    async GetSearchedUsers(query : string) : Promise<User[]> {
      // const querySnapshot = await admin.firestore().collection('profiles').get();
      // const querySnapshot = await admin.firestore().collectionGroup('users').where(query, 'in', ['*', '']);
      const querySnapshot = await admin.firestore().collection('profiles').where('Name', '>=', query).where('Name', '<=', query + '\uf8ff').get(); //from ChatGBT
      
      const numDocs = querySnapshot.size;
      console.log(`There are ${numDocs} documents in the 'profiles' collection.`);
      const returnedUsers: User[] = [];


      querySnapshot.forEach((doc) => {
        // if(doc.data()?.['displayName'] === query){
          // console.log("hi");
          console.log(doc.data());  
          // const name = doc.data()?.['Name'];
          const myUser : User = {
            name    : doc.data()?.['Name'],
            bio    : doc.data()?.['bio'],
            photoURL : doc.data()?.['photoURL'],
            profileId : doc.data()?.['id']
          }
          returnedUsers.push(myUser);
      });
      return returnedUsers;
    };



    // ### Not working, try subcollections ###
    async GetSearchedPosts(query : string): Promise<Post[]> {
      // const handle = await admin.firestore().collection('users').get();

      const myPost : Post = {
        content : "string",
        caption : "string",
        postId : "string",
        profileId : "string"
      }
      const returnedPosts: Post[] = [myPost];
      // handle.forEach((doc) => {
      //   const p = doc.data()?.collection('posts');
      //   p.forEach((p2) => {
      //     if(p2.['caption'] === query){
      //       posts.push({})
      //     }
      //   })
      // });
      
      return returnedPosts; 
    }

    getStringValue(value: any): string {
      return value.toString();
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