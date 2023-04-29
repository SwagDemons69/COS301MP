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

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async continueWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
