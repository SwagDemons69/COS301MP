import { Timestamp } from 'firebase-admin/firestore';
import { NotificationType } from '../enums';

export interface notification {
    user_id : string; // the user that the notification is for
    type : NotificationType; // the type of notification
    seen : boolean; // if the user has seen the notification
    timestamp : Timestamp; // the time the notification was created
    notification_id : string; // the id of the notification on firebase
    liker_id? : string; // the id of the user that liked the post
    post_id? : string; // the id of the post that was liked
    comment_id? : string; // the id of the comment that was liked
    follower_id? : string; // the id of the user that followed the user
    doner_id? : string; // the id of the user that donated time to the user
    amount_donated? : number; // the amount of time that was donated
    accepted? : boolean; // if the follow request was accepted
    timeLeft? : Timestamp; // the time left on the user's account
    system_message? : string; // the message that the system wants to send
    commenter_id? : string; // the id of the user that commented on the post
  }

// this type of notification is used when a user likes a post
export interface postDislikedNotification extends notification {
  type: NotificationType.PostLikedNotification;
  liker_id: string;
  post_id: string;
}

// this type of notification is used when a user likes a post
export interface postLikedNotification extends notification {
    type: NotificationType.PostLikedNotification;
    liker_id: string;
    post_id: string;
}

// this type of notification is used when a user comments on a post
export interface postCommentedNotification extends notification {
    type: NotificationType.PostCommentedNotificatoin;
    commenter_id: string;
    comment_id: string;
    post_id: string;
}

// example postCommentNotification
//

// this type of notification is used when a user dislikes a post
export interface newFollowerNotification extends notification {
    type: NotificationType.NewFollowerNotification;
    follower_id: string;
}

// this type of notification is used when a user donates time to another user
export interface newDonationNotification extends notification {
    type: NotificationType.NewDonationNotification;
    doner_id: string;
    amount_donated: number; // should this be chronos?
}

// this type of notification is used when a user likes a comment
export interface commentLikedNotification extends notification {
    type: NotificationType.CommentLikedNotification;
    liker_id: string;
    comment_id: string;
    post_id: string;
}

// this type of notification is used when a user likes a comment
export interface newPostCommentLike extends notification {
    type: NotificationType.NewPostCommentLike;
    liker_id: string;
    comment_id: string;
    post_id: string;
}

// this type of notification is used when a user runs out of time
export interface TimeRunningOutNotification extends notification {
    type: NotificationType.TimeRunningOutNotification;
    timeLeft: Timestamp;
}

// this type of notification is used when a user runs out of time
export interface systemNotification extends notification {
    type: NotificationType.SystemNotification;
    system_message: string;
}

export interface followRequestNotification extends notification {
    type: NotificationType.FollowRequestNotification;
    follower_id: string;
    accepted: boolean;
}

export interface followRequestAcceptedNotification extends notification {
    type: NotificationType.FollowRequestAcceptedNotification;
    follower_id: string;
    accepted: boolean;
}

export interface followRequestDeclinedNotification extends notification {
    type: NotificationType.FollowRequestDeclinedNotification;
    follower_id: string;
    accepted: boolean;
}
export interface followRequestNotification extends notification {
    type: NotificationType.FollowRequestNotification;
    follower_id: string;
}

export interface followRequestAcceptedNotification extends notification {
    type: NotificationType.FollowRequestAcceptedNotification;
    follower_id: string;
    accepted: boolean;
}

export interface followRequestDeclinedNotification extends notification {
    type: NotificationType.FollowRequestDeclinedNotification;
    follower_id: string;
    accepted: boolean;
}
