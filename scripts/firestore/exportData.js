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

//===============================================
// EXPORT TO FIRESTORE
//===============================================
const generateProfiles = async () => {
          // Create sample data
          const profiles = [
              { id : '6', Name: 'Alice4', Surname: 'A4', Age: 72 }
            ];

          for (const profile of profiles) {
            await db.collection('profiles').doc(profile.id).set(profile);
          }
}; 

//=============================================
// FUNCTION CALLS
//=============================================

generateProfiles();

admin.app().delete();
//=============================================