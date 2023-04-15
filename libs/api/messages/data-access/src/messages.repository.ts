import { IMessages } from '@mp/api/messages/util';
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
    async sendMessage(messages: IMessages) {
        return await admin
            .firestore()
            .collection('messages') //check whether should be chats
            //todo
    }

    async getContacts(messages: IMessages) {
        return await admin
            .firestore()
            .collection('messages')
            //todo
    }

    async getChatHistory(messages: IMessages) {
        return await admin
            .firestore()
            .collection('messages')
            //todo
    }
}