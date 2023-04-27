export enum NotificationType {
    PostDislikedNotification = 'Post Disliked Notification',
    PostLikedNotification = 'Post Liked Notification',  // when click you go to the post
    PostCommentedNotificatoin = 'Post Commented Notification', //go to the post and focus on the comment
    NewFollowerNotification = 'New Follower Notification', // go the profile of the follower
    NewDonationNotification = 'New Donation Notification', //just a message
    CommentLikedNotification = 'Comment Liked Notification', //go to the post and focus on the comment
    NewPostCommentLike = 'New Post Comment Like', //go to the post and focus on the comment
    TimeRunningOutNotification = 'Time Running Out Notification', //just a message
    SystemNotification = 'System Notification', // just a message
    FollowRequestNotification = 'Follow Request Notification', // go to the profile of the follower
    FollowRequestAcceptedNotification = 'Follow Request Accepted Notification', // go to the profile of the follower
    FollowRequestDeclinedNotification = 'Follow Request Declined Notification', // go to the profile of the follower
}