import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from '@angular/fire/auth';
import { signOut } from '@firebase/auth';
//import { Firestore } from '@angular/fire/firestore';
//import { collection, doc, Firestore, updateDoc } from '@firebase/firestore';
import { collection, collectionData, Firestore, updateDoc, UpdateData, doc } from '@angular/fire/firestore';
@Injectable()
export class AuthApi {
  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  auth$() {
    return authState(this.auth);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  async register(email: string, password: string, username: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
    // .then( (result) => {
    //   console.log("USER ID: " + result.user.uid)
      // const userRef = doc(this.firestore, `users/${result.user.uid}`);

      // updateDoc(userRef, { displayName: username });
      
      // const profilesRef = doc(this.firestore, `profiles/${result.user.uid}`);
      
      // updateDoc(profilesRef, { username: username });
      
    //   return updateProfile(result.user, {
    //     displayName: username
    //   });
      
      
    // }).catch(function(error) {
    //   console.log(error);
    // });
  }

  async continueWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout() {
    return await signOut(this.auth);
  }

  async setUsername(uid:string | undefined, username: string){
    const profilesRef = doc(this.firestore, `profiles/${uid}`);
    if(profilesRef)
    updateDoc(profilesRef, { username: username });
  }
}
