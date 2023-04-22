import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { SearchResponse, User, Post} from '@mp/api/search/util';
import * as admin from 'firebase-admin';


@Injectable()
export class SearchRepository {
  constructor(){}
    returnedPosts: Post[] = []; //What is returned after all posts are found
    async search(query: string): Promise<SearchResponse> {
        const foundUsers = await this.GetSearchedUsers(query);
        await this.iterateAllPosts(query);

        const response = {profiles : foundUsers, posts: this.returnedPosts};

        console.log(response)

        return response;
    }
    
    //will need to change searched for value to displayName to user when merging with completed profile page
    async GetSearchedUsers(query : string) : Promise<User[]> {
      // const querySnapshot = await admin.firestore().collection('profiles').get();
      // const querySnapshot = await admin.firestore().collectionGroup('users').where(query, 'in', ['*', '']);
      const querySnapshot = await admin.firestore().collection('users').where('email', '>=', query).where('email', '<=', query + '\uf8ff').get(); //from ChatGBT
      
      const returnedUsers: User[] = [];

      querySnapshot.forEach((doc) => { 
          const myUser : User = {
            name    : doc.data()?.['displayName'],
            bio    : doc.data()?.['bio'],
            photoURL : doc.data()?.['profilePicturePath'],
            profileId : doc.data()?.['user_id'],
            email : doc.data()?.['email']
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