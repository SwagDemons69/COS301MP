//================================================
// IMPORTS && SETUP
//================================================ 

const admin = require('firebase-admin');

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

//===============================================
// FUNCTIONS
//===============================================

const generateProfiles = async () => {
        //try {
          // Create sample data
          const profiles = [
              { id : '4', Name: 'Alice4', Surname: 'A4', Age: 72 },
              { id : '2', Name: 'Alice2', Surname: 'A2', Age: 70 },
              { id : '3', Name: 'Alice3', Surname: 'A3', Age: 71 },
              { id : '5', Name: 'Alice3', Surname: 'A3', Age: 71 }
            ];

          for (const profile of profiles) {
            await db.collection('profiles').doc(profile.id).set(profile);
          }
        //} 
        // finally {
        
        //   admin.app().delete();
        // }
};

const addAllData = async () => {
  try{
    const users = [
      {
        user_id : "10398140",
        username: "DieSeeKat",
        name: "Lukas Anthonissen",
        email: "lukas007@gmail.com",
        password: "ynw8yw82n283c2doNdq6T*&nqn",
        bio : "live love life",
        profilePicturePath : "C:\\images\\gigachad.jpg",
        province : "gp",
        timeOfExpiry: 33235271617,
        likesLeft: 10,
        dislikesLeft: 5,
        commentLikesLeft : 7,
        notPublic : true,
        posts: [
          {
              post_id: "69",
              user_id: "10398140",
              timestamp: 63216132236,
              content: "C:\\images\\dodgeCoinMeme.jpg",
              caption: "Crypto go brrrrrr",
              likes: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", ""],
              shares : 23432,
              kronos : 56734,
              comments: ["I love my mom"],
              categories: ["memes","crypto"], 
              taggedUsers : ["8971892"]
          } 
        ],
        followers: ["8971892"],
        following: ["8971892"],
        followRequests: ["4512312342"],
        chats : ["22424"],
        blocked: ["tewstwssts"]
      },
      {
        user_id : "8971892",
        username: "RuRu",
        name: "Ruan Rossouw",
        email: "ruanRos@gmail.com",
        password: "ynw8yw82n283c2doNdq6T*&nqn",
        bio : "UP student",
        profilePicturePath : "C:\\images\\superchad.pdf",
        province : "gp",
        timeOfExpiry: 1678362817,
        likesLeft: 6,
        dislikesLeft: 10,
        commentLikesLeft : 2,
        notPublic : true,
        followers: ["10398140", "6893798251", "4512312342"],
        following: ["10398140", "6893798251", "4512312342"],
        followRequests: ["2346745234532"],
        chat : ["22424"],
        blocked: ["123456"]
      },
      {
        user_id: "4512312342",
        username: "johndoe",
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "ioahtewiaqohapojid",
        bio: "I'm a web developer and I love programming!",
        profilePicturePath: "C:\\images\\coolProgrammingImage.jpg",
        province: "wc",
        timeOfExpiry: 1649193600,
        likesLeft: 5,
        dislikesLeft: 2,
        commentLikesLeft: 4,
        notPublic: false,
        posts: [
            {
                post_id: "7893254",
                user_id: "10398140",
                timestamp: 3489056708362,
                content: "C:\\images\\screenshot456.jpg",
                caption: "Can this code just compileeeeeeee?!?!?!?!",
                likes: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
                shares : 5672,
                kronos : 6973,
                comments: [
                    {
                        root_comment_id: 2134324321,
                        kronos : 6313,
                        text: "I understand the pain!!!",
                        user: 8971892,
                        likes: 12876,
                        comments: []
                    },
                    {
                        root_comment_id: 2352312523,
                        kronos : 643,
                        text: "You've got it love!",
                        user: 2346745234532,
                        likes: 879,
                        comments: [
                            {   
                                child_comment_id: 698768719324,
                                kronos : 5,
                                text: "<3",
                                user: 4512312342,
                                likes: 97
                            },
                            {   
                                child_comment_id: 28971230568,
                                kronos : 2,
                                text: "<3",
                                user: 2346745234532,
                                likes: 980
                            }
                        ]
                    }
                ],
                categories: ["coding"], 
                taggedUsers : []
            }
        ],
        followers: ["2346745234532"],
        following: ["2346745234532"],
        followRequests: ["10398140"],
        notifications: [
            {
                notification_id : 621869053,
                text : "DieSeeKat sent you a follow request",
                followRequest : 10398140
            }
        ],
        chats : [],
        blocked: []
      },
      {
        user_id: "2346745234532",
        username: "janedoe",
        name: "Jane Doe",
        email: "janedoe@icloud.com",
        password: "5thApril2011",
        bio: "<3 John",
        profilePicturePath: "C:\\images\\HoneyMoonWithJohn.jpg",
        province: "wc",
        timeOfExpiry: 1649193600,
        likesLeft: 10,
        dislikesLeft: 10,
        commentLikesLeft: 4,
        notPublic: true,
        posts: [
            {
                post_id: "9432236323",
                user_id: "2346745234532",
                timestamp: 7243127612,
                content: "C:\\images\\img3521361.jpg",
                caption: "Grabbed coffee with the best people ever!",
                likes: ["", "", "", "", "", "", "", "", "", ""],
                shares : 2547,
                kronos : 980896,
                comments: [
                    {
                        root_comment_id: 23453,
                        kronos : 632,
                        text: "We must make this a regular thing",
                        user: 152346348,
                        likes: 5456,
                        comments: [
                            {   
                                child_comment_id: 231657423,
                                kronos : 43,
                                text: "Yesss please",
                                user: 2346745234532,
                                likes: 23
                            }
                        ]
                    },
                    {
                        root_comment_id: 32562383,
                        kronos : 7,
                        text: "Was so much fun",
                        user: 6893798251,
                        likes: 0,
                        comments: []
                    }
                ],
                categories: ["coffee"], 
                taggedUsers : [152346348, 6893798251]
            },
            {
                post_id: "27324",
                user_id: "2346745234532",
                timestamp: 63421627,
                content: "C:\\videos\\honeyMoonMemories.mp4",
                caption: "A time I will never forget!",
                likes: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                shares : 12356,
                kronos : 34153,
                comments: [
                    {
                        root_comment_id: 312612,
                        kronos : 63532,
                        text: "Congratulations! The perfect couple!!",
                        user: 152346348,
                        likes: 234,
                        comments: []
                    }
                ],
                categories: ["honeymoon", "memories"],
                taggedUsers : [4512312342]
            }           
        ],
        followers: ["4512312342", "152346348", "6893798251"],
        following: ["4512312342", "152346348", "6893798251"],
        followRequests: ["123"],
        blocked: []
      },
      {  
        user_id: "152346348",
        username: "laura76",
        name: "Laura Mills",
        email: "lauramills@gmail.com",
        password: "zv13Kj#L!m", 
        bio: "Hi, I'm Laura! I love hiking and exploring new places.",
        profilePicturePath: "C:\\images\\waterfall.png",
        province: "lp",
        timeOfExpiry: 1734490222,
        likesLeft: 4,
        dislikesLeft: 5,
        commentLikesLeft: 2,
        notPublic: true,
        posts: [
            {
                post_id: "6478",
                user_id: "152346348",
                timestamp: 83413451,
                content: "C:\\videos\\hikeMemories.mp4",
                caption: "Whataba 3 day hike",
                likes: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                shares : 6341,
                kronos : 343,
                comments: [
                    {
                        root_comment_id: 312612,
                        kronos : 63532,
                        text: "Next time I'm joining no matter what",
                        user: 6893798251,
                        likes: 3,
                        comments: []
                    }
                ],
                categories: ["hike", "memories"],
                taggedUsers : [6893798251]
            }
        ],
        followers: ["2346745234532", "6893798251"],
        following: ["2346745234532", "6893798251"],
        blocked: []
      },
      {
        user_id: "6893798251",
        id: "6893798251",
        username: "sarahparker",
        name: "Sarah Parker",
        email: "sarahparker@example.com",
        password: "tW#8mz@K!x", 
        bio: "I'm a coffee and adventure addict",
        profilePicturePath: "C:\\images\\img352343.jpg",
        province: "kzn",
        timeOfExpiry: 1734490222,
        likesLeft: 5,
        dislikesLeft: 1,
        commentLikesLeft: 4,
        notPublic: true,
        followers: [152346348, 2346745234532],
        following: [152346348],
        followRequests: [2346745234532],
        notifications: [
            {
                notification_id : 632346213,
                text : "johndoe sent you a follow request",
                followRequest : 4512312342
            }
        ],
        chats: [352362],
        blocked: []
      }
  ]

  const chats = [
    {
      chat_id : "22424",
      chatName : "The Cool Cats",
      users : [10398140, 8971892],
      messages : [
        {
            message_id : 24987,
            from : 10398140,
            timestamp : 129348768213,
            caption : "I'm going to play LoL at 8, wanna join?"
        },
        {
          message_id : 24988,
            from : 8971892,
            timestamp : 129348234233,
            caption : "Sure! I'll probably hop on at about half 9"
        },
        {
          message_id : 24989,
            from : 8971892,
            timestamp : 129348233523,
            post : 69
        },
        {
          message_id : 24990,
            from : 8971892,
            timestamp : 129348238974,
            caption : "BTW this post is hilarious!!!"
        },
        {
          message_id : 24991,
            from : 10398140,
            timestamp : 129348664871,
            caption : "sus"
        }
      ]
    },
    {
      chat_id : "352362",
      users : [6893798251, 152346348, 2346745234532],
      chatName : "Hiking Squad",
      messages : [
        {
            message_id : 24887,
            from : 152346348,
            timestamp : 129348664871,
            post : 6478,
            caption : "I wish you guys were there"
        },
        {
            message_id : 24587,
            from : 6893798251,
            timestamp : 129348664971,
            caption : "I know. It looked so fun. Will definitely join next time ;)"
        }
      ]	
    }
  ]

  const leaderboards = [{
      leaderboard_id : "global",
      users : [10398140, 8971892, 6893798251, 152346348, 4512312342, 2346745234532]
    }, {
      leaderboard_id : "gauteng",
      users : [10398140, 8971892]
    },{
      leaderboard_id : "limpopo",
      users : [152346348]
    },{
      leaderboard_id : "kzn",
      users : [6893798251]
    },{
      leaderboard_id : "westCape",
      users : [4512312342, 2346745234532]  
    }
  ];

    for (const user of users) {
      await db.collection('profiles').doc(user.user_id).set(user);
    } 

    for (const chat of chats) {
      await db.collection('chats').doc(chat.chat_id).set(chat);
    }

    for (const leaderboard of leaderboards) {
      await db.collection('leaderboards').doc(leaderboard.leaderboard_id).set(leaderboard);
    }
  }

  finally{
    admin.app().delete();
  }
};


const generatePosts = async () => {
  try{
    const posts = [
    { post_id : "1",
      user_id : "Sg1j9YlEbEbeOeg1Of3Un79W4Lj7",
      content : "https://picsum.photos/id/19/300/300",
      caption : "Test Post",
      likes : 69,
      timeStamp : 13452824,
      shares : 0,
      kronos : 0,
      comments : [],
      categories : [],
      taggedUsers : []
    }, { 
      post_id : "2",
      user_id : "Sg1j9YlsdfddasfEbEbeOeg1Of3Un79W4Lj7",
      content : "https://picsum.photos/id/19/300/300",
      caption : "Test Post",
      likes : 34243,
      timeStamp : 42342523,
      shares : 0,
      kronos : 0,
      comments : [],
      categories : [],
      taggedUsers : []
    }
    ];

    for (const post of posts) {
      await db.collection('posts').doc(post.post_id).set(post);
    }
  }

  finally{
    admin.app().delete();
  }
};
const user_id = "uc8QbbFocqzdU7xRZcjTnMTbV9q1";
const addPosts = async () => {
  try{
        const posts = [
          { id : "1",
          post_id : "1",
          user_id : user_id,
          content : "https://picsum.photos/id/19/300/300",
          caption : "Test Post 1",
          likes : 69,
          timeStamp : 13452824,
          shares : 0,
          kronos : 0,
          comments : [],
          categories : [],
          taggedUsers : []
        },
        { id : "2",
          post_id : "2",
          user_id : user_id,
          content : "https://picsum.photos/id/23/300/300",
          caption : "Test Post 2",
          likes : 69,
          timeStamp : 13452824,
          shares : 0,
          kronos : 0,
          comments : [],
          categories : [],
          taggedUsers : []
        }
      ];
      //for(const post of posts){
        await db.collection('profiles').doc(user_id).update({posts: posts});
  }
  finally{
    admin.app().delete();
  }
}



//=============================================
// FUNCTION CALLS
//=============================================

generatePosts();
//addPosts();
addAllData();


//=============================================

const importProfiles = async () => {
  const handle = await db.collection('profiles').get();
  const profiles = [];
  handle.forEach((doc) => {
    if(doc.data().Name === "Alice4"){
      const data = doc.data();
      //const name = doc.data().Name;
      profiles.push(doc.data());
    }

  });
  //logProfiles(profiles)
return profiles;
}; 

//   function logProfiles(profiles){
//     console.log(profiles[0]);
// }

//=============================================
// FUNCTION CALLS
//=============================================

// async function test() {
// const profiles = await importProfiles();
// console.log(profiles);
// }

// test();

// admin.app().delete();
// //================================================
// // IMPORTS && SETUP
// //================================================
// const admin = require('firebase-admin');

// //create connection to firebase app
// admin.initializeApp({ projectId: 'twenty4-f9f8e' });

// //Create connection to firestore
// const db = admin.firestore();

// //Specify firestore connection
// // 5003 is specified for firestore in firestore.json
// db.settings({
//   host: "localhost:5003",
//   ssl: false,
// });

// //===============================================
// // FUNCTIONS
// //===============================================

// const generateProfiles = async () => {

//   // "user_id" : 10398140,
//   // "username": "DieSeeKat",
//   // "name": "Lukas Anthonissen",
//   // "email": "lukas007@gmail.com",
//   // "password": "ynw8yw82n283c2doNdq6T*&nqn",

//   // const myUser : User = {
//   //   name    : "string",
//   //   bio    : "string",
//   //   photoURL : "string",
//   //   profileId : "string"
//   // }
//         try {
//           // Create sample data
//           const profiles = [
//               { id : '4', Name: 'Alice', Surname: 'A4', Age: 72, bio: "I am a bio Alice", photoURL: "https://www.google.com"},
//               { id : '2', Name: 'Alice2', Surname: 'A4', Age: 72, bio: "I am a bio Bob", photoURL: "https://www.google.com"},
//               { id : '3', Name: 'Alice3', Surname: 'A4', Age: 72, bio: "I am a bio Charlie", photoURL: "https://www.google.com"},
//               { id : '5', Name: 'Alice4', Surname: 'A4', Age: 72, bio: "I am a bio Daniel", photoURL: "https://www.google.com"}
//             ];

//           for (const profile of profiles) {
//             await db.collection('profiles').doc(profile.id).set(profile);
//           }
//         } 
//         finally {
//           admin.app().delete();
//         }
// };

// const getProfiles = async() => {
//     const handle = await db.collection('profiles').get();
//     const profiles = [];
//     handle.forEach((doc) => {
//       var received = "" + doc.data().Name;
//       if(received.includes("Alice")){
//         const data = doc.data();
//         //const name = doc.data().Name;
//         profiles.push(doc.data());
//       }
//     }); 

//     for(let i = 0; i < profiles.length; i++){
//       console.log(profiles[i].Name);
//     }
//   return profiles;
// };

// const getProfiles2 = async(query) => {
//   const querySnapshot = await db.collection('profiles').where('Name', '>=', query).where('Name', '<=', query + '\uf8ff').get(); //from ChatGBT
//   const profiles = [];
//   var count = 0;
//     querySnapshot.forEach((doc) => {
//       console.log(count++);
//       profiles.push(doc.data());
//     });

//     for(let i = 0; i < profiles.length; i++){
//       console.log(profiles[i]);
//     }
// }

// //=============================================
// // FUNCTION CALLS
// //=============================================

// generateProfiles();
// getProfiles2("A");

// //=============================================

