import { Injectable } from '@angular/core';
import { getStorage, ref , uploadBytes, connectStorageEmulator} from '@angular/fire/storage';
import { initializeApp } from '@firebase/app';


import * as admin from 'firebase-admin';


//const exampleRef = ref(storage,'images/space.jpg');
//can use .root or .parent on example ref to navigate

//Each ref has: fullPath, name, bucket
//fullPath 
//- 1 - 1024 bytes UTF-8
//- no \n\r
//- avoid using special characters



@Injectable()
export class PostApi {
//   constructor(){}

uploadPost(file: File, fileName : string){
    // admin.initializeApp({ projectId: 'twenty4-f9f8e' });
    //const app = admin.app();
   
    // const storage = getStorage();
    // //connectStorageEmulator(storage, "localhost", 5006);
    // const photosRef = ref(storage,'photos');
    // //const new
    // const videosRef = ref(storage,'videos');
    

    // console.log(photosRef.bucket)//Correct bucket
    // uploadBytes(photosRef, file).then((snapshot) =>{
    //     console.log(fileName + " Uploaded!");
    //     //console.log(snapshot.ref.fullPath)
    // }).catch((error) => {
    //     console.log(error);
    // });
    
}
// uploadPost(file: File, fileName : string){
//     const storage = app.storage();

// }


}