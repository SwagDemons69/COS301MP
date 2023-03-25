//================================================
// IMPORTS && SETUP
//================================================
const { profile } = require('console');

const { createUserWithEmailAndPassword, getAuth } = require('firebase/auth');
const { keys } = require('../../keys');

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:5002';
const admin = require('firebase-admin');
const authApp = admin.initializeApp({
  projectId: 'twenty4-f9f8e',
  credential: admin.credential.cert({
    projectId: 'twenty4-f9f8e',
    privateKey: keys.private_key,
    clientEmail: keys.client_email,
  }),
  databaseURL: 'https://twenty4-f9f8e-default-rtdb.europe-west1.firebasedatabase.app',
  authDomain: 'localhost:5002',
});

//console.log(authApp.options.projectId)
const db = admin.firestore();

db.settings({
  host: "localhost:5003",
  ssl: false,
});

const auth = admin.auth();

//===============================================
// GENERATE USERS
//===============================================
// const count = 10;

// const firstNames = ["Emma", "Olivia", "Ava", "Sophia", "Isabella",
//                     "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"];

// const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown",
//                    "Davis", "Miller", "Wilson", "Moore", "Taylor"];

// const createUsers = async () => {
//   const uids = [];
//   const gmail = "@gmail.com";
//   for(let i = 0; i < count ; i++){
//     const email = firstNames[i] + "." + lastNames[lastNames.length-1-i] + gmail;
//     const password = "verysafepass" + i;
//     //console.log(email + " " + password);
//     //createUserWithEmailAndPassword(email,password).then((firebase.auth.Auth) => { uids.push(user.user.uid); });
//     try {
//       const userCredential = await createUserWithEmailAndPassword(getAuth(authApp), email, password);
//       uids.push(userCredential.user.uid);
//       console.log(`User ${userCredential.user.uid} created successfully.`);
//     } catch (error) {
//       console.error(`Error creating user: ${error.message} (${error.code})`);
//     }
//    }
//   //return uids;
// }

// async function test() {
//   const uids = await createUsers();
//   console.log(uids);
// }

// test();
async function getUsers() {
  let usersArray = [];
  const users = await auth.listUsers();
      for(let i = 0; i < users.users.length ; i++){
          //usersArray.push(users.users[i]);
          const data = users.users[i];
          let newUser = {
            id : data.uid,
            username : data.displayName,
            name : data.displayName,
            email : data.email,
            password : data.passwordHash,
            bio : "",
            profilePic : data.photoURL,
            province : "",
            followerCount : 0,
            timeOfExpiry_hours : 350,
            likes : 0,
            dislikes : 0,
            commentLikes : 0,
            public : true,
            posts : [],
            followRequests : [],
            following : [],
            followers : []
          };
      
      //addUser(newUser);
      usersArray.push(newUser);
    }
  return usersArray;
};
//===============================================
// EXPORT TO FIRESTORE
//===============================================
const createUsers = async () => {
          // Create sample data
          const users = await getUsers();

          for (const user of users) {
            await db.collection('users').doc(user.id).set(user);
          }
          authApp.delete();
};

createUsers();

