import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { SearchResponse, User, Post} from '@mp/api/search/util';
import * as admin from 'firebase-admin';


@Injectable()
export class SearchRepository {
  constructor(){}
    async search(query: string): Promise<SearchResponse> {
        const foundUsers = await this.GetSearchedUsers(query);
        const foundPosts = await this.iterateAllPosts(query);//Need to look at how to access subcollections

        const response = {profiles : foundUsers, posts: foundPosts};

        console.log(response)

        return response;
    }
    
    //will need to change searched for value to displayName to user when merging with completed profile page
    //check what the used name convention is for users/profiles
    async GetSearchedUsers(query : string) : Promise<User[]> {
      const querySnapshot = await admin.firestore().collection('profiles').where('username', '>=', query).where('username', '<=', query + '\uf8ff').get(); //from ChatGBT
      
      const returnedUsers: User[] = [];

      querySnapshot.forEach((doc) => {
          const myUser : User = {
            name    : doc.data()?.['username'],
            bio    : doc.data()?.['bio'],
            photoURL : doc.data()?.['profilePicturePath'],
            profileId : doc.data()?.['user_id'],
            email : doc.data()?.['email']
          }
          returnedUsers.push(myUser);
      });
      return returnedUsers;
    };

    async iterateAllPosts(query : string): Promise<Post[]> {
      const returnedPosts: Post[] = [];
      const usersRef = await admin.firestore().collection('profiles').get();

      usersRef.forEach(async (doc) => {
        const posts = await this.GetSearchedPosts(query, doc.ref, doc.data()?.['username']); 
        returnedPosts.concat(posts);
      });

      return returnedPosts;
    };

    async GetSearchedPosts(query : string, userRef : FirebaseFirestore.DocumentReference, username : string): Promise<Post[]> {
      const returnedPosts: Post[] = [];

      const postRef = await userRef.collection('posts').get();

      console.log("User '" + username + "' has " + postRef.size + " posts");

      postRef.forEach((doc) => {
        if(doc.data()?.['caption'].includes(query)){
          console.log("Here we are")
          const myPost : Post = {
            content : doc.data()?.['content'],
            caption : doc.data()?.['caption'],
            postId : doc.data()?.['postId'],
            username : username
          }
          console.log(myPost);
          returnedPosts.push(myPost);
        }
      });

      return returnedPosts;
    };
}