

@Injectable()
export class NotificationService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async createNotification(userId, displayName, timeStamp): Promise<Notification> {
    const notification = new Notification();
    notification.recipientId = userId;
    notification.text = displayName;
    notification.type = timeStamp;
    notification.createdAt = new Date().toISOString();
    const docRef = await this.firestoreService
      .collection('notifications')
      .add(Object.assign({}, notification));
    notification.id = docRef.id;
    return notification;
  }

  async getFollowers(userId: string): Promise<string[]> {
    // Code to retrieve list of user's followers from Firebase
  }

  async sendNotification(notification: Notification) {
      const message: admin.messaging.Message = {
        notification: {
          title: notification.title,
          type: notification.type,
        },
        data: {
          postId: notification.postId,
          recipientId: notification.recipientId,
        },
        authorId: notification.authorId,
      };

      try {
        const response = await admin.messaging().send(message);
        console.log(`Notification sent successfully: ${response}`);
      } catch (error) {
        console.error(`Error sending notification: ${error}`);
      }
    }
}
