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
      const querySnapshot = await admin.firestore().collection('profiles').get(); //from ChatGBT
      
      const returnedUsers: User[] = [];

      querySnapshot.forEach((doc) => {
        const username = "" + doc.data()?.['username'];
        const email = "" +  doc.data()?.['email'];
        if(query === ""){}
        else if(username.toLowerCase().includes(query.toLowerCase()) || email.toLowerCase().includes(query.toLowerCase())){
          const myUser : User = {
            name    : doc.data()?.['username'],
            bio    : doc.data()?.['bio'],
            photoURL : doc.data()?.['profilePicturePath'],
            profileId : doc.data()?.['user_id'],
            email : doc.data()?.['email']
          }
          returnedUsers.push(myUser);
        }
      });
      return returnedUsers;
    };

    async iterateAllPosts(query : string): Promise<Post[]> {
      const returnedPosts: Post[] = [];
      const usersRef = await admin.firestore().collection('profiles').get();


      usersRef.forEach(async (doc) => {
        const posts: [] = doc.data()?.['posts'] as [];
        if(posts && posts.length){
          for(let i = 0; i < posts.length; i++){
            if(query === ''){}
            else if(doc.data()?.['posts'][i]['caption'].includes(query)){
              const myPost : Post = {
                content : doc.data()?.['posts'][i]['content'],
                caption : doc.data()?.['posts'][i]['caption'],
                postId : doc.data()?.['posts'][i]['post_id'],
                username : doc.data()?.['username']
              }
              returnedPosts.push(myPost);
            }
          }
        }
        
        
      });

      return returnedPosts;
    };
}