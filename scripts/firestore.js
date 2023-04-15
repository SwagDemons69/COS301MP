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


const generatePosts = async () => {
  try{
    const posts = [
    { id : "1",
      post_id : "1",
      user_id : "Sg1j9YlEbEbeOeg1Of3Un79W4Lj7",
      content : "https://picsum.photos/id/19/300/300",
      caption : "Test Post",
      likes : 69,
      timeStamp : 13452824,
      shares : 0,
      kronos : 0,
      comments : [],
      categories : [],
      taggedUsers : []}
    ];

    for (const post of posts) {
      await db.collection('posts').doc(post.id).set(post);
    }
  }

  finally{
    admin.app().delete();
  }
};
const user_id = "bae7f9popp8IrbE2effYuG5dQcQe";
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

//generatePosts();
addPosts();

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