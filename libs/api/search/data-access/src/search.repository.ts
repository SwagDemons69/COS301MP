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
    returnedPosts: Post[] = []; //What is returned after all posts are found

    async search(query: string): Promise<SearchResponse> {
        const foundUsers = await this.GetSearchedUsers(query);
        await this.iterateAllPosts(query);
        const retrievedprofiles: User[] = []
        const posts: Post[] = [];
  

        for(let i = 0; i < foundUsers.length; i++){
          var name = foundUsers[i].name;
          var bio = foundUsers[i].bio;
          var photoURL = foundUsers[i].photoURL;
          var profileId = foundUsers[i].profileId;
          retrievedprofiles.push({name, bio, photoURL, profileId});
        }

        for(let i = 0; i < this.returnedPosts.length; i++){
          var name = this.returnedPosts[i].content;
          var bio = this.returnedPosts[i].caption;
          var photoURL = this.returnedPosts[i].profileId;
          var profileId = this.returnedPosts[i].profileId;
          retrievedprofiles.push({name, bio, photoURL, profileId});
        }
        var response = {profiles : retrievedprofiles, posts};

        return response;
    }
    
    async GetSearchedUsers(query : string) : Promise<User[]> {
      // const querySnapshot = await admin.firestore().collection('profiles').get();
      // const querySnapshot = await admin.firestore().collectionGroup('users').where(query, 'in', ['*', '']);
      const querySnapshot = await admin.firestore().collection('users').where('displayName', '>=', query).where('displayName', '<=', query + '\uf8ff').get(); //from ChatGBT
      
      const numDocs = querySnapshot.size;
      console.log(`There are ${numDocs} documents in the 'profiles' collection.`);
      const returnedUsers: User[] = [];


      querySnapshot.forEach((doc) => {
          console.log(doc.data());  
          const myUser : User = {
            name    : doc.data()?.['username'],
            bio    : doc.data()?.['bio'],
            photoURL : doc.data()?.['profilePicturePath'],
            profileId : doc.data()?.['user_id']
          }
          returnedUsers.push(myUser);
      });
      return returnedUsers;
    };

    async iterateAllPosts(query : string) {
      const usersRef = await admin.firestore().collection('users').get();
      const allFoundPosts = [];

      usersRef.forEach(doc => {
        this.GetSearchedPosts(query, doc.ref, doc.data()?.['user_id']);
      });
    };

    async GetSearchedPosts(query : string, userRef : FirebaseFirestore.DocumentReference, id : string) {

      const postRef = await userRef.collection('posts').where('caption', '>=', query).where('caption', '<=', query + '\uf8ff').get();

      postRef.forEach((doc) => {
          console.log(doc.data());  
          const myPost : Post = {
            content : doc.data()?.['content'],
            caption : doc.data()?.['caption'],
            postId : doc.data()?.['postId'],
            profileId : id
          }
          this.returnedPosts.push(myPost);
      });
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