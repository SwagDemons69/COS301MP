import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { post } from '@mp/api/home/util';
import { map, Observable } from 'rxjs';
import { from } from 'rxjs';
import { user_profile } from '@mp/api/profiles/util';
import 'firebase/compat/database';
import 'firebase/firestore';
import { firstValueFrom } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';@Injectable()


export class DashboardApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  profile$(id: string) {
    const docRef = doc(
      this.firestore,
      `profiles/${id}`
    ).withConverter<user_profile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as user_profile;
      },
      toFirestore: (it: user_profile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async postsFromFollowers$(users: string[]): Promise<post[]> {
    const profileRef = collection(this.firestore, 'profiles');
    const selectedProfiles = from(getDocs(profileRef)).pipe(
      map((querySnapshot) => querySnapshot.docs
        .filter((doc) => users.includes(doc.id))
        .map((doc) => ({
        user_id : doc.id,
        timeOfExpiry: doc.data()['timeOfExpiry'],
        notPublic : doc.data()['notPublic'],
        username : doc.data()['username'],
        name : doc.data()['name'],
        profilePicturePath : doc.data()['profilePicturePath'],
        bio : doc.data()['bio'],
        email : doc.data()['email'],
        password : doc.data()['password'],
        province : doc.data()['province'],
        likesLeft : doc.data()['likesLeft'],
        dislikesLeft : doc.data()['dislikesLeft'],
        commentLikesLeft :  doc.data()['commentLikesLeft'],
        followers :  doc.data()['followers'],
        following : doc.data()['following'],
        posts : doc.data()['posts'],
        blocked : doc.data()['blocked'],
        notifications : doc.data()['notifications'],
        followRequests : doc.data()['followRequests']
      })))
    ) as Observable<user_profile[]>;

    const posts: post[] = [];
    const profiles = await firstValueFrom(selectedProfiles);
    profiles.forEach((profile) => {
      if (profile.posts != null) {
        profile.posts.forEach((post: post) => {
          posts.push(post);
        });
      }
    });

    return posts;
  };

  async allPosts$(): Promise<post[]> {
    const profileRef = collection(this.firestore, 'profiles');
    const selectedProfiles = from(getDocs(profileRef)).pipe(
      map((querySnapshot) => querySnapshot.docs
        .map((doc) => ({
        user_id : doc.id,
        timeOfExpiry: doc.data()['timeOfExpiry'],
        notPublic : doc.data()['notPublic'],
        username : doc.data()['username'],
        name : doc.data()['name'],
        profilePicturePath : doc.data()['profilePicturePath'],
        bio : doc.data()['bio'],
        email : doc.data()['email'],
        password : doc.data()['password'],
        province : doc.data()['province'],
        likesLeft : doc.data()['likesLeft'],
        dislikesLeft : doc.data()['dislikesLeft'],
        commentLikesLeft :  doc.data()['commentLikesLeft'],
        followers :  doc.data()['followers'],
        following : doc.data()['following'],
        posts : doc.data()['posts'],
        blocked : doc.data()['blocked'],
        notifications : doc.data()['notifications'],
        followRequests : doc.data()['followRequests']
      })))
    ) as Observable<user_profile[]>;

    const posts: post[] = [];
    const profiles = await firstValueFrom(selectedProfiles);
    profiles.forEach((profile) => {
      if (profile.posts != null) {
        profile.posts.forEach((post: post) => {
          posts.push(post);
        });
      }
    });

    return posts;
  };

  post$(id: string) {
    const docRef = doc(
      this.firestore,
      `posts/${id}`
    ).withConverter<post>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as post;
      },
      toFirestore: (it: post) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  posts$(): Observable<post[]> {
    const postsRef = collection(this.firestore, 'posts');
    return from(getDocs(postsRef)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => ({
        post_id : doc.id,
        user_id : doc.data()['user_id'],
        content : doc.data()['content'],
        caption : doc.data()['caption'],
        likes : doc.data()['likes'],
        timeStamp : doc.data()['timeStamp'],
        shares : doc.data()['shares'],
        kronos : doc.data()['kronos'],
        comments : doc.data()['comments'],
        categories : doc.data()['categories'],
        taggedUsers : doc.data()['taggedUsers']
      })))
    );
  }
}



