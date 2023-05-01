import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { post } from '@mp/api/home/util';
import { post_like } from '@mp/api/post/util';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { user } from 'firebase-functions/v1/auth';
import { CreateChatMessageResponse, ChatMessage, ChatMessages, ChatHeadersResponse, ChatHeader, ChatHeaders, GetChatMessagesResponse } from '@mp/api/chat/util';
import { Timestamp } from 'firebase-admin/firestore';
import { user_profile } from '@mp/api/profiles/util';
import { notification } from '@mp/api/notifications/util';
export interface recip {
    recipient: string;
};


@Injectable()
export class ChatRepository {

    async getChatHeaders(user: string): Promise<ChatHeadersResponse>{
        const chatHeaders = [];

        const userChatsRef = await admin.firestore().collection(`profiles/${user}/chats`).get();
        const chats = userChatsRef.docs.map((doc) => { return doc.data() as recip;});

        for(let i = 0; i < chats.length; i++){
            const profilesRef = admin.firestore().collection(`profiles`).doc(chats[i].recipient);
            const profile = await profilesRef.get();
            const profileData = profile.data() as user_profile;

            let username = profileData.username;
            if(typeof username != "string" || ( (typeof username == "string") && (username == "") )){
                username = profileData.email
            }
            const picture  = profileData.profilePicturePath;

            const messagesRef = await admin.firestore().collection(`profiles/${user}/chats/${chats[i].recipient}/chat`).get();
            const messages  = messagesRef.docs.map((doc) => { return doc.data() as ChatMessage;});

            let index = 0;
            let max = "0";
            for(let j = 0; j < messages.length; j++){
                if(messages[j].timeStamp > max){
                    max = messages[j].timeStamp;
                    index = j;
                }
            }
            const sentBy = messages[index].sender;

            const lastMessage = (sentBy == user) ? ("You: " + messages[index].payload) : (username + ": " + messages[index].payload) ;

            const user_id = profileData.user_id;

            const chat: ChatHeader = {
                user_id: user_id,
                username: username,
                picture: picture,
                lastMessage: lastMessage
            }
            if(profileData.user_id != user)
                chatHeaders.push(chat);
        }

        return { chats: chatHeaders };
    }


    async getChatMessages(sender: string, receiver: string): Promise<GetChatMessagesResponse>{

        const handle = await admin.firestore().collection(`profiles/${sender}/chats`).get();
        const chats = handle.docs.map((doc) => { return doc.data() as ChatMessages;});

        let flag = false;
        for(let i = 0;i < chats.length; i++){
            if(chats[i].recipient == receiver)
                flag = true;
        }

        //If false chat dosent exist
        if(!flag){
            return { messages : [] };
        }
        else{
            const handle = await admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).get();
            return { messages : handle.docs.map((doc) => { return doc.data() as ChatMessage;}) };
        }
    }

    //Send message to someone in an existing chat
    async sendChatMessage(sender: string, receiver: string, timeStamp: string, payload: string){

        const handle = await admin.firestore().collection(`profiles/${sender}/chats`).get();
        const chats = handle.docs.map((doc) => { return doc.data() as recip;});

        let flag = false;
        for(let i = 0;i < chats.length; i++){
            if(chats[i].recipient == receiver)
                flag = true;
        }

        //Flag=false -> Create a chat
        if(!flag)
            await this.createChat(sender, receiver, timeStamp, payload);
        else
            await this.addChatMessage(sender, receiver, timeStamp, payload);
    }

    //Create Chat with someone
    async createChat(sender: string, receiver: string, timeStamp: string, payload: string){

        //Chat Needs to be created for both users
        const senderRef = admin.firestore().collection(`profiles/${sender}/chats`).doc(receiver);
        const receiverRef = admin.firestore().collection(`profiles/${receiver}/chats`).doc(sender);
        senderRef.set({ recipient : receiver});
        receiverRef.set({ recipient : sender});

        const senderChatRef = admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).doc();
        const recieveChatRef = admin.firestore().collection(`profiles/${receiver}/chats/${sender}/chat`).doc();

        ///////////////////////
        //Real time update use
        const senderRef2 = admin.firestore().collection(`profiles`).doc(receiver);
        const receiveRef2 = admin.firestore().collection(`profiles`).doc(sender);

        //Pain
        await senderRef2.set({lastEdited: Timestamp.now().seconds.toString()}, {merge: true});
        await receiveRef2.set({lastEdited: Timestamp.now().seconds.toString()}, {merge: true});
        ///////////////////////


        const message: ChatMessage =
        { sender    : sender,
          receiver  : receiver,
          timeStamp :  Timestamp.now().seconds.toString(),
          payload   : payload
        };
        await senderChatRef.set(message);
        await recieveChatRef.set(message);

        const receiverRef3 = admin.firestore().collection('profiles').doc(receiver);
        const receiverProfile = await receiverRef3.get();
        const receiver1 = receiverProfile.data() as user_profile;

        const notifcationsRef = admin.firestore().collection(`profiles/${receiver1.user_id}/notifications`).doc();

        const senderRef3 = admin.firestore().collection('profiles').doc(sender);
        const senderProfile = await senderRef3.get();
        const sender1 = senderProfile.data() as user_profile;


        const noti: notification = {
          create_by_id: sender1.user_id,
          notification_id: "",
          image: sender1.profilePicturePath,
          type: "New Message",
          username: sender1.username,
          payload: "has sent you a message",
          timestamp: Timestamp.now(),
          timeStampOrder: Timestamp.now().seconds.toString()
        }

        noti.notification_id = notifcationsRef.id;
        notifcationsRef.set(noti);
    }

    async addChatMessage(sender: string, receiver: string, timeStamp: string, payload: string){
        //"Send" Message to both users
        const senderRef = admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).doc();
        const recieveRef = admin.firestore().collection(`profiles/${receiver}/chats/${sender}/chat`).doc();


        ///////////////////
        const senderRef2 = admin.firestore().collection(`profiles`).doc(receiver);
        const receiveRef2 = admin.firestore().collection(`profiles`).doc(sender);

        //Pain
        await senderRef2.set({lastEdited: Timestamp.now().seconds.toString()}, {merge: true});
        await receiveRef2.set({lastEdited: Timestamp.now().seconds.toString()}, {merge: true});
        ///////////////////



        const message: ChatMessage =
        { sender    : sender,
          receiver  : receiver,
          timeStamp : Timestamp.now().seconds.toString(),
          payload   : payload
        };

        await senderRef.set(message);
        await recieveRef.set(message);

        const receiverRef3 = admin.firestore().collection('profiles').doc(receiver);
        const receiverProfile = await receiverRef3.get();
        const receiver1 = receiverProfile.data() as user_profile;

        const notifcationsRef = admin.firestore().collection(`profiles/${receiver1.user_id}/notifications`).doc();

        const senderRef3 = admin.firestore().collection('profiles').doc(sender);
        const senderProfile = await senderRef3.get();
        const sender1 = senderProfile.data() as user_profile;


        const noti: notification = {
          create_by_id: sender1.user_id,
          notification_id: "",
          image: sender1.profilePicturePath,
          type: "New Message",
          username: sender1.username,
          payload: "has sent you a message",
          timestamp: Timestamp.now(),
          timeStampOrder: Timestamp.now().seconds.toString()
        }

        console.log(noti)

        noti.notification_id = notifcationsRef.id;
        notifcationsRef.set(noti);
    }
}
