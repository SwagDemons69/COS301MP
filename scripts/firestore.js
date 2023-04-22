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

  // "user_id" : 10398140,
  // "username": "DieSeeKat",
  // "name": "Lukas Anthonissen",
  // "email": "lukas007@gmail.com",
  // "password": "ynw8yw82n283c2doNdq6T*&nqn",

  // const myUser : User = {
  //   name    : "string",
  //   bio    : "string",
  //   photoURL : "string",
  //   profileId : "string"
  // }
        try {
          // Create sample data
          const profiles = [
              { id : '4', Name: 'Alice', Surname: 'A4', Age: 72, bio: "I am a bio Alice", photoURL: "https://www.google.com"},
              { id : '2', Name: 'Bob', Surname: 'A4', Age: 72, bio: "I am a bio Bob", photoURL: "https://www.google.com"},
              { id : '3', Name: 'Charlie', Surname: 'A4', Age: 72, bio: "I am a bio Charlie", photoURL: "https://www.google.com"},
              { id : '5', Name: 'Daniel', Surname: 'A4', Age: 72, bio: "I am a bio Daniel", photoURL: "https://www.google.com"}
            ];

          for (const profile of profiles) {
            await db.collection('profiles').doc(profile.id).set(profile);
          }
        } 
        finally {}
};

const getProfiles = async() => {
    const handle = await db.collection('profiles').get();
    const profiles = [];
    handle.forEach((doc) => {
      var received = "" + doc.data().Name;
      if(received.includes("Alice")){
        const data = doc.data();
        //const name = doc.data().Name;
        profiles.push(doc.data());
      }
    });

    for(let i = 0; i < profiles.length; i++){
      console.log(profiles[i].Name);
    }
  return profiles;
};

//=============================================
// FUNCTION CALLS
//=============================================

generateProfiles();
const foundUsers = getProfiles();

for(var user in foundUsers){
  console.log(user.Name);
}

admin.app().delete();

//=============================================