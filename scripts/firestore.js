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

//=============================================
// FUNCTION CALLS
//=============================================

generateProfiles();

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

async function test() {
const profiles = await importProfiles();
console.log(profiles);
}

test();

admin.app().delete();