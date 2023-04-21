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
        try {
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