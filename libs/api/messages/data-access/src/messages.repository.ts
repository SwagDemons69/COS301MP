import { IChats, IIndividualChatHistory, IMessage, IContacts} from "@mp/api/messages/util";
import { Injectable } from "@nestjs/common";
import { user_profile } from "@mp/api/profiles/util" ;
import * as admin from "firebase-admin";

@Injectable()
export class MessagesRepository {
  // helper function used to find a specific user
    async findUser(user_id : string) {
        console.log("USER ID: " + user_id)
        return await admin
        .firestore()
        .collection('users')
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
      async getChats(user_id: string): Promise<IIndividualChatHistory[]> {
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
      // to send a message
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
      // to get the messages for a specific chat, returned from latest timestamp to earliest timestamp
      async getMessages(chat: IIndividualChatHistory): Promise<IMessage[]> {
        const messagesRef = admin.firestore().collection('chats').doc(chat.chat_id).collection('messages');
        const snapshot = await messagesRef.orderBy('timeStamp', 'desc').get();
        return snapshot.docs.map(doc => doc.data() as IMessage);
    }
    
      // to get all the user's contacts.
      async getContacts(user_id: string): Promise<IContacts> {
        const snapshotUser = await this.findUser(user_id);
        // Get the array of following user IDs and convert them to IContact objects
        const followingIds = snapshotUser.get('following') as string[] | undefined;
        const followingContacts = followingIds
          ? await Promise.all(followingIds.map(async (followingId) => {
              const followingSnapshot = await this.findUser(followingId);
              return {
                user_id: followingId,
                name: followingSnapshot.get('name'),
                profilePicturePath: followingSnapshot.get('profilePicturePath')
              };
            }))
          : null;
        // Get the array of follower user IDs and convert them to IContact objects
        const followerIds = snapshotUser.get('followers') as string[] | undefined;
        const followerContacts = followerIds
          ? await Promise.all(followerIds.map(async (followerId) => {
              const followerSnapshot = await this.findUser(followerId);
              return {
                user_id: followerId,
                name: followerSnapshot.get('name'),
                profilePicturePath: followerSnapshot.get('profilePicturePath')
              };
            }))
          : null;
        return {
          user_id: user_id,
          following: followingContacts,
          followers: followerContacts
        };
      }

}
    
   