import { Injectable } from '@nestjs/common';
import { getStorage, ref , uploadBytes, connectStorageEmulator, uploadString} from 'firebase/storage';
import { initializeApp } from '@firebase/app';
import { post } from '@mp/api/home/util';
import { post_like } from '@mp/api/post/util';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { user } from 'firebase-functions/v1/auth';
import { CreateChatMessageResponse, ChatMessage, ChatMessages } from '@mp/api/chat/util';


@Injectable()
export class ChatRepository {


    async getChatMessages(sender: string, receiver: string, chat: ChatMessage): Promise<CreateChatMessageResponse>{

        const handle = await admin.firestore().collection(`profiles/${sender}/chats`).get();
        const chats = handle.docs.map((doc) => { return doc.data() as ChatMessages;});

        let flag = false;
        for(let i = 0;i < chats.length; i++){
            if(chats[i].recipient == receiver)
                flag = true;
        }

        //If false chat dosent exist
        if(!flag){
            return { messages :  {recipient: receiver, messages: []}};
        }
        else{
            const handle = await admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).get();
            return { messages :  {recipient: receiver, messages: handle.docs.map((doc) => { return doc.data() as ChatMessage;}) }};
        }
    }

    //Send message to someone in an existing chat
    async sendChatMessage(sender: string, receiver: string, timeStamp: string, payload: string){

        const handle = await admin.firestore().collection(`profiles/${sender}/chats`).get();

        const chats = handle.docs.map((doc) => { return doc.data() as ChatMessages;});

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
        const recieveRef = admin.firestore().collection(`profiles/${receiver}/chats`).doc(sender);

        const senderChatRef = admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).doc();
        const recieveChatRef = admin.firestore().collection(`profiles/${receiver}/chats/${sender}/chat`).doc();

        const message: ChatMessage = 
        { sender    : sender,
          receiver  : receiver,
          timeStamp : timeStamp,
          payload   : payload
        };

        await senderChatRef.set(message);
        await recieveChatRef.set(message);
    }

    async addChatMessage(sender: string, receiver: string, timeStamp: string, payload: string){
        //"Send" Message to both users
        const senderRef = admin.firestore().collection(`profiles/${sender}/chats/${receiver}/chat`).doc();
        const recieveRef = admin.firestore().collection(`profiles/${receiver}/chats/${sender}/chat`).doc();

        const message: ChatMessage = 
        { sender    : sender,
          receiver  : receiver,
          timeStamp : timeStamp,
          payload   : payload
        };

        await senderRef.set(message);
        await recieveRef.set(message);
    }



}