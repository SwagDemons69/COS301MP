import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { post } from '@mp/api/home/util';
import { post_like } from '@mp/api/post/util';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { user } from 'firebase-functions/v1/auth';
import { CreateChatMessageResponse, ChatMessage, ChatMessages, ChatHeadersResponse, ChatHeader, ChatHeaders } from '@mp/api/chat/util';
import { Timestamp } from 'firebase-admin/firestore';
import { user_profile } from '@mp/api/profiles/util';
import { collection } from '@firebase/firestore';
import { SearchProfileModal } from '@mp/api/search-modal/util';

@Injectable()
export class SearchModalRepository {

    async retrieveProfiles(user: string){
        const profilesRef = await admin.firestore().collection(`profiles`).get();
        const profiles = profilesRef.docs.map((doc) => { return doc.data() as user_profile;});

        const newProfiles = [];

        for(let i = 0; i < profiles.length ; i++){
            
            let username = profiles[i].username;
            if(typeof username != "string" || ( (typeof username == "string") && (username == "") )){
                username = profiles[i].email
            }

            const user_id = profiles[i].user_id;
            const picture = profiles[i].profilePicturePath
            //const picture = "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-95-116461.png?f=avif&w=256" ;
           

            const modal:SearchProfileModal = 
            {
                user_id: user_id,
                username: username,
                pictureUrl: picture,
                isFriend : true
            }

            if(user_id != user){
                newProfiles.push(modal);
            }
        }

        return { profiles: newProfiles};
    }
}