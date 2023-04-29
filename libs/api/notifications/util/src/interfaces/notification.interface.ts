import { Timestamp } from 'firebase-admin/firestore';

export interface notification {
    notification_id : string; // the id of the notification on firebase
    image : string; // the user that the notification is for
    type : string; // the type of notification 
    username: string;
    payload: string;
    timestamp : Timestamp; // the time the notification was created
    timeStampOrder: string;
}

// // this type of notification is used when a user likes a post
// export interface postLikedNotification extends notification {
//     type: NotificationType.PostLikedNotification;
//     liker_id: string;
//     post_id: string;
// }

// // this type of notification is used when a user comments on a post
// export interface postCommentedNotification extends notification {
//     type: NotificationType.PostCommentedNotificatoin;
//     comment_id: string;
//     post_id: string;
// }

// // this type of notification is used when a user dislikes a post
// export interface newFollowerNotification extends notification {
//     type: NotificationType.NewFollowerNotification;
//     follower_id: string;
// }

// // this type of notification is used when a user donates time to another user
// export interface newDonationNotification extends notification {
//     type: NotificationType.NewDonationNotification;
//     doner_id: string;
//     amount_donated: number; // should this be chronos?
// }

// // this type of notification is used when a user likes a comment
// export interface commentLikedNotification extends notification {
//     type: NotificationType.CommentLikedNotification;
//     liker_id: string;
//     comment_id: string;
//     post_id: string;
// }

// // this type of notification is used when a user likes a comment
// export interface newPostCommentLike extends notification {
//     type: NotificationType.NewPostCommentLike;
//     liker_id: string;
//     comment_id: string;
//     post_id: string;
// }

// // this type of notification is used when a user runs out of time
// export interface TimeRunningOutNotification extends notification {
//     type: NotificationType.TimeRunningOutNotification;
//     timeLeft: Timestamp;
// }

// // this type of notification is used when a user runs out of time
// export interface systemNotification extends notification {
//     type: NotificationType.SystemNotification;
//     system_message: string;
// }

