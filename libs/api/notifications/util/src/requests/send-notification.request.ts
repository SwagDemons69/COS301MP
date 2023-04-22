import { notification } from '../interfaces';

// this should be used to create a notification and add it to the firebase collection for notifications
// so when someone likes/follows/comments/etc.. it will create a notification for the user
export interface SendNotificationRequest {
    userId: string;
    notification: notification;
}

// example notification
// {
//     user_id: '1234',
//     type: NotificationType.PostLikedNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     liker_id: '1234',
//     post_id: '1234'
// }

// user : {
//     ...
// ..
//     notifications: [{
//     user_id: '1234',
//     type: NotificationType.PostLikedNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     liker_id: '1234',
//     post_id: '1234'
// }, ]
// }

// example follow notification
// {
//     user_id: '1234',
//     type: NotificationType.FollowNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     follower_id: '1234',
// }
