//================================================
// IMPORTS && SETUP
//================================================
const admin = require('firebase-admin');
const { resolve } = require('path');
const { faker } = require('@faker-js/faker');
const { Timestamp } = require ('@google-cloud/firestore');

//create connection to firebase app
admin.initializeApp({ projectId: 'twenty4-f9f8e' });

//Create connection to firestore
const db = admin.firestore();

//Specify firestore connection
// 5003 is specified for firestore in firestore.json
db.settings({
  host: "localhost:5003",
  ssl: false,
});

//================================================
const NotificationType = {
  PostDislikedNotification : 'Post Disliked Notification',
  PostLikedNotification : 'Post Liked Notification',  // when click you go to the post
  PostCommentedNotificatoin : 'Post Commented Notification', //go to the post and focus on the comment
  NewFollowerNotification : 'New Follower Notification', // go the profile of the follower
  NewDonationNotification : 'New Donation Notification', //just a message
  CommentLikedNotification : 'Comment Liked Notification', //go to the post and focus on the comment
  NewPostCommentLike : 'New Post Comment Like', //go to the post and focus on the comment
  TimeRunningOutNotification : 'Time Running Out Notification', //just a message
  SystemNotification : 'System Notification', // just a message
  FollowRequestNotification : 'Follow Request Notification', // go to the profile of the follower
  FollowRequestAcceptedNotification : 'Follow Request Accepted Notification', // go to the profile of the follower
  FollowRequestDeclinedNotification : 'Follow Request Declined Notification', // go to the profile of the follower
}



const notifications = [
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_216',
    liker_id: 'liker_789',
    post_id: 'post_123'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_215',
    liker_id: 'liker_790',
    post_id: 'post_124'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_214',
    liker_id: 'liker_791',
    post_id: 'post_125'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_213',
    comment_id: 'comment_456',
    post_id: 'post_123'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_1011',
    comment_id: 'comment_789',
    post_id: 'post_456'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_1213',
    comment_id: 'comment_1011',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_138',
    follower_id: 'follower_789'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_137',
    follower_id: 'follower_790'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_136',
    follower_id: 'follower_791'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_135',
    doner_id: 'doner_789',
    amount_donated: 50.0
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_134',
    doner_id: 'doner_101',
    amount_donated: 20.0
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_862',
    doner_id: 'doner_369',
    amount_donated: 100.0
  },
  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_248',
    liker_id: 'liker_789',
    comment_id: 'comment_123',
    post_id: 'post_456'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_147',
    liker_id: 'liker_456',
    comment_id: 'comment_789',
    post_id: 'post_123'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_951',
    liker_id: 'liker_012',
    comment_id: 'comment_456',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_159',
    liker_id: 'liker_789',
    comment_id: 'comment_123',
    post_id: 'post_456'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_696',
    liker_id: 'liker_012',
    comment_id: 'comment_456',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_111',
    liker_id: 'liker_345',
    comment_id: 'comment_789',
    post_id: 'post_012'
  },
  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_555',
    timeLeft: new Timestamp(1644604800, 0) // January 12, 2022 12:00:00 AM GMT+00:00
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_910',
    timeLeft: new Timestamp(1661923200, 0) // September 30, 2022 12:00:00 AM GMT+00:00
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_1112',
    timeLeft: new Timestamp(1675372800, 0) // February 2, 2023 12:00:00 AM GMT+00:00
  },
  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_485',
    system_message: 'Your account has been temporarily suspended'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_101',
    system_message: 'Scheduled maintenance will be performed on our servers this weekend'
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_112',
    system_message: 'A new version of the app is available, please update to enjoy new features and improvements'
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_456',
    follower_id: 'follower_212',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestNotification,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_780',
    follower_id: 'follower_312',
    accepted: true
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: true,
    timestamp: new Date('2023-04-28T10:20:30Z'),
    notification_id: 'notification_300',
    follower_id: 'follower_789',
    accepted: true
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: false,
    timestamp: new Date('2023-04-27T12:30:00Z'),
    notification_id: 'notification_789',
    follower_id: 'follower_123',
    accepted: true
  },
  
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: true,
    timestamp: new Date('2023-04-26T15:45:00Z'),
    notification_id: 'notification_012',
    follower_id: 'follower_345',
    accepted: true
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_455',
    follower_id: 'follower_456',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_456',
    follower_id: 'follower_749',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_457',
    follower_id: 'follower_787',
    accepted: false
  }

];

const name = faker.name.firstName();
const surname = faker.name.lastName();
const profile = {
    user_id: "user_123",
    timeOfExpiry: Date.now() / 1000 + 21*24*60*60,
    notPublic: "false",
    username: faker.internet.userName(name, surname),
    name: faker.internet.userName(name, surname),
    profilePicturePath: faker.internet.avatar(),
    bio: faker.lorem.sentence(),
    email: faker.internet.email(name, surname),
    password: "",
    province: "Gauteng",
    likesLeft: 10,
    dislikesLeft: 10,
    commentLikesLeft: 10,
    followers: [], 
    following: [], 
    blocked: [],    
    posts: [],  
    notifications: notifications
}
// db.collection('profiles').doc(profile.id).set(profile);
const profileRef = admin.firestore().collection('profiles').doc("TEUSY8c3Zwjm74K0XxFvDlaTdvus");
profile.user_id = profileRef.id;
profileRef.set(profile);