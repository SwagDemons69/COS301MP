import { IMessages } from "@mp/api/messages/util";
import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { it } from "node:test";

@Injectable()
export class MessagesRepository{
    async findChatsfromChats(messages: IMessages){
        console.log(messages.chatID)
        return await admin
            .firestore()
            .collection('chats')
            .withConverter<IMessages>({
                fromFirestore: (snapshot) => {
                    return snapshot.data as unknown as IMessages;
                },
                toFirestore: (it: IMessages) => it,
            })
            .doc(messages.chatID)
            .get();
    }
    async findChatfromUser(chatID: string){
        console.log("Chat ID: " + chatID)
        return await admin
        .firestore
    }
    async getChatHistory(messages: IMessages) {
        return await admin
            .firestore()
            .collection('messages')
            //todo
    }
}