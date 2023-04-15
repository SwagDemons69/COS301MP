import { IChats, IIndividualChatHistory, IMessages, IMessage} from "@mp/api/messages/util";
import { Injectable } from "@nestjs/common";
import { user_profile } from "@mp/api/profiles/util" ;
import * as admin from "firebase-admin";

@Injectable()
export class MessageRepository {
    // private chatConverter = {
    //   toFirestore(chat: IIndividualChatHistory): admin.firestore.DocumentData {
    //     return {
    //       flag: chat.flag,
    //       messages: chat.messages.map((message) => this.messageConverter.toFirestore(message)),
    //       chatID: chat.chatID,
    //       chatName: chat.chatName,
    //     };
    //   },
    //   fromFirestore(snapshot: admin.firestore.DocumentData): IIndividualChatHistory {
    //     const data = snapshot['chat'].data();
    //     const messages: IMessage[] = [];
    //     if (data.messages) {
    //       for (const message of data.messages) {
    //         messages.push({
    //             message_id: message.message_id,
    //             from: message.from,
    //         timeStamp: message.timeStamp,
    //             caption: message.caption,
    //         });
    //       }
    //     }
    //     return {
    //       flag: data.flag,
    //       messages: messages,
    //       chatID: data.chatID,
    //       chatName: data.chatName,
    //     };
    //   }
      
    // };
  
    // private messageConverter = {
    //   toFirestore(message: IMessage): FirebaseFirestore.DocumentData {
    //     return {
    //       message_id: message.message_id,
    //       from: message.from,
    //       timeStamp: message.timeStamp,
    //       caption: message.caption,
    //     };
    //   },
    //   fromFirestore(
    //     snapshot: admin.firestore.DocumentData //needs to change to a valid query
    //   ): IMessage {
    //     const data = snapshot['message'].data();
    //     return {
    //         message_id: data.message_id,
    //         from: data.from,
    //         timeStamp: data.timeStamp,
    //         caption: data.caption,
    //     };
    //   },
    // };

    //to find the user whose messages need to be loaded
    async findUser(user_id : string) {
        console.log("USER ID: " + user_id)
        return await admin
        .firestore()
        .collection('profiles')
        .withConverter<user_profile>({
          fromFirestore: (snapshot) => {
            return snapshot.data() as user_profile;
          },
          toFirestore: (it: user_profile) => it,
        })
        .doc(user_id)
        .get();
      }

      // to get the specific chats for that user
      async getChats(chatsOnScreen: IChats, user_id: string): Promise<IIndividualChatHistory[]> {
        const snapshotUser = await this.findUser(user_id);
        const chatIDs = snapshotUser.get('chats');
        const chatDocs = await admin.firestore()
          .collection('chat')
          .where(admin.firestore.FieldPath.documentId(), 'in', chatIDs)
          .withConverter<IIndividualChatHistory>({
            fromFirestore: (snapshot) => {
              return { 
                chat_id: snapshot.get('chat_id'), 
                chatName: snapshot.get('chatName'), 
                users: snapshot.get('users'),
                messages: snapshot.get('messages'),
              };
            },
            toFirestore: (chat: IIndividualChatHistory) => {
              return {
                chat_id: chat.chat_id,
                chatName: chat.chatName,
                messages: chat.messages,
                users: chat.users,
              };
            },
          })
          .get();
        return chatDocs.docs.map(doc => doc.data());
      }

      async sendMessage(message: IMessage, chat: IIndividualChatHistory){
        const db = admin.firestore();
        // Add the message to the chat's messages array
        chat.messages.push(message);
        // Update the chat document in the database
        const chatRef = db.collection('chat').doc(chat.chat_id);
        await chatRef.update({
            messages: chat.messages,
        });
      }
}
    
   