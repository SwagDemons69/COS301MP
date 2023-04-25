import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { user_profile } from '@mp/api/profiles/util'
import { SearchResponse, Post } from '@mp/api/search/util';
import * as admin from 'firebase-admin';
import { post } from '@mp/api/home/util';

@Injectable()
export class SearchRepository {
  constructor(){}
    async search(query: string): Promise<SearchResponse> {
        const validUsers = await this.GetSearchedUsers(query);
        const validPosts = await this.iterateAllPosts(query);//Need to look at how to access subcollections

        return {profiles : validUsers, posts: validPosts};
    }

    // ===============================================
    // HELPER FUNCTIONS
    // ===============================================

    
    //will need to change searched for value to displayName to user when merging with completed profile page
    //check what the used name convention is for users/profiles
    async GetSearchedUsers(query : string) : Promise<user_profile[]> {

      if(query === "") { return []; }

      const profilesRef = await admin.firestore().collection('profiles').get();
      const profiles = profilesRef.docs.map((profile) => { return profile.data() as user_profile});

      const validProfiles: user_profile[] = [];

      profiles.forEach((profile) => {

          if(profile.username?.toLowerCase().includes(query.toLowerCase()) || profile.email?.toLowerCase().includes(query.toLowerCase()) ){
            validProfiles.push(profile);
          }
      })

      return validProfiles;
    };

    async iterateAllPosts(query : string): Promise<Post[]> {
      if(query === "") { return [] };
      
      const profilesRef = await admin.firestore().collection('profiles').get();
      const profiles = profilesRef.docs.map((profile) => { return profile.data() as user_profile});
      const profilesUsernames = profiles.map(profile => profile.username);
      const profileIds = profiles.map(profile => profile.user_id);
      
      
      const validPosts: Post[] = [];

      for(let i = 0; i < profileIds.length;i++){
          const postsRef = await admin.firestore().collection(`profiles/${profileIds[i]}/posts`).get();
          const posts = postsRef.docs.map((post) => { return post.data() as post });
          for(let j = 0; j < posts.length; j++){
            if(posts[j].caption.toLowerCase().includes(query.toLowerCase()))
              validPosts.push({ post: posts[j], posted_by: profilesUsernames[i]});
          }
      }
      return validPosts;
    };
}