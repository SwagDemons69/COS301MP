//================================================
// IMPORTS && SETUP
//================================================
const { profile } = require('console');
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

//==============================================
// IMPORT FROM FIRESTORE
//==============================================
/**
 * Async function returns promise 
 * 
 * @param {*} logProfiles Passed in as callback function to use data after data has been 
 *                        loaded into profiles.
 */
const importProfiles = async () => {
    const handle = await db.collection('profiles').get();
    const profiles = [];
    handle.forEach((doc) => {
      const data = doc.data();
      profiles.push(data);
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
//=============================================