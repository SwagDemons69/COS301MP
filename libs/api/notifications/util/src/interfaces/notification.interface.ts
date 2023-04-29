import { Timestamp } from 'firebase-admin/firestore';


export enum NotificationType {
  PostCreated = 'POST_CREATED',
  PostLiked = 'POST_LIKED',
  PostCommented = 'POST_COMMENTED',
}

export class Notification {
  id: string;
  recipientId: string;
  authorID?: string
  postId?: string;
  title?: string;
  type: NotificationType;
  createdAt: string| Timestamp;

constructor( recipientId: string, type: NotificationType,createdAt: string| Timestamp){
this.recipientId=recipientId;
this.type=type;
this.createdAt=createdAt;
}

   constructor(notification: Notification) {
      this.id = notification.id;
      this.recipientId = notification.recipientId;
      this.authorID= notification.authorID;
      this.postId=notification.postId;
      this.title = notification.text;
      this.type = notification.type;
      this.createdAt = notification.createdAt;
}
