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
    type: NotificationType.PostDislikedNotification ,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_001',
    liker_id: 'liker_789',
    post_id: 'post_123'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostDislikedNotification ,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_002',
    liker_id: 'liker_790',
    post_id: 'post_124'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostDislikedNotification ,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_003',
    liker_id: 'liker_791',
    post_id: 'post_125'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_004',
    liker_id: 'liker_789',
    post_id: 'post_123'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_005',
    liker_id: 'liker_790',
    post_id: 'post_124'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_006',
    liker_id: 'liker_791',
    post_id: 'post_125'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_007',
    comment_id: 'comment_456',
    post_id: 'post_123'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_008',
    comment_id: 'comment_789',
    post_id: 'post_456'
  },
  {
    user_id: 'user_123',
    type: NotificationType.PostCommentedNotificatoin,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_009',
    comment_id: 'comment_1011',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_010',
    follower_id: 'follower_789'
  },

  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_011',
    follower_id: 'follower_790'
  },

  {
    user_id: 'user_123',
    type: NotificationType.NewFollowerNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_012',
    follower_id: 'follower_791'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_013',
    doner_id: 'doner_789',
    amount_donated: 50.0
  },

  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_014',
    doner_id: 'doner_101',
    amount_donated: 20.0
  },

  {
    user_id: 'user_123',
    type: NotificationType.NewDonationNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_015',
    doner_id: 'doner_369',
    amount_donated: 100.0
  },
  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_016',
    liker_id: 'liker_789',
    comment_id: 'comment_123',
    post_id: 'post_456'
  },

  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_017',
    liker_id: 'liker_456',
    comment_id: 'comment_789',
    post_id: 'post_123'
  },

  {
    user_id: 'user_123',
    type: NotificationType.CommentLikedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_018',
    liker_id: 'liker_012',
    comment_id: 'comment_456',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_019',
    liker_id: 'liker_789',
    comment_id: 'comment_123',
    post_id: 'post_456'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_020',
    liker_id: 'liker_012',
    comment_id: 'comment_456',
    post_id: 'post_789'
  },
  {
    user_id: 'user_123',
    type: NotificationType.NewPostCommentLike,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_021',
    liker_id: 'liker_345',
    comment_id: 'comment_789',
    post_id: 'post_012'
  },
  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_022',
    timeLeft: new Timestamp(1644604800, 0) // January 12, 2022 12:00:00 AM GMT+00:00
  },

  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_023',
    timeLeft: new Timestamp(1661923200, 0) // September 30, 2022 12:00:00 AM GMT+00:00
  },

  {
    user_id: 'user_123',
    type: NotificationType.TimeRunningOutNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_024',
    timeLeft: new Timestamp(1675372800, 0) // February 2, 2023 12:00:00 AM GMT+00:00
  },
  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_025',
    system_message: 'Your account has been temporarily suspended'
  },

  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_026',
    system_message: 'Scheduled maintenance will be performed on our servers this weekend'
  },

  {
    user_id: 'user_123',
    type: NotificationType.SystemNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_027',
    system_message: 'A new version of the app is available, please update to enjoy new features and improvements'
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_028',
    follower_id: 'follower_212',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestNotification,
    seen: true,
    timestamp: new Date(),
    notification_id: 'notification_029',
    follower_id: 'follower_312',
    accepted: true
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: true,
    timestamp: new Date('2023-04-28T10:20:30Z'),
    notification_id: 'notification_030',
    follower_id: 'follower_789',
    accepted: true
  },

  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: false,
    timestamp: new Date('2023-04-27T12:30:00Z'),
    notification_id: 'notification_031',
    follower_id: 'follower_123',
    accepted: true
  },

  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestAcceptedNotification,
    seen: true,
    timestamp: new Date('2023-04-26T15:45:00Z'),
    notification_id: 'notification_032',
    follower_id: 'follower_032',
    accepted: true
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_033',
    follower_id: 'follower_456',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_034',
    follower_id: 'follower_749',
    accepted: false
  },
  {
    user_id: 'user_123',
    type: NotificationType.FollowRequestDeclinedNotification,
    seen: false,
    timestamp: new Date(),
    notification_id: 'notification_035',
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

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('UserId:', user_id => {
  console.log(`Inserting notifications for user: ${user_id}`);
  const profileRef = admin.firestore().collection('profiles').doc(user_id);
  profile.user_id = profileRef.id;
  profileRef.set(profile);
  readline.close();
});
// db.collection('profiles').doc(profile.id).set(profile);
// const profileRef = admin.firestore().collection('profiles').doc("TEUSY8c3Zwjm74K0XxFvDlaTdvus");
// profile.user_id = profileRef.id;
// profileRef.set(profile);
