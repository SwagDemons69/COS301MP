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

class user {
  constructor(name, surname){
    this.name = name;
    this.surname = surname;
  }

  toString(){
    return this.name + ' ' + this.surname;
  }
};

const getProfiles = async() => {
  try{
    // const found = [];
  // const allUsers =  await db.collection('profiles').get();
  const allUsersConverter = {
    toFireStore: (user) => {
      return {
        Name : user.name,
        Surname : user.Surname
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new user(data.name, data.surname);
    }
  };

  const ref = db.collection("profiles").withConverter(allUsersConverter);
  const allUsers = [];

  if(ref){
    allUsers = ref.get();
    console.log("success ==> " + allUsers);
    return allUsers;
  }
  else{
    console.log("Failure");
    return allUsers;
  }
  }
  catch{
    console.log("fail")
  }
  

  // for(const user of allUsers){
  //   if(user.Name == "Alice4"){
  //     found.push(user.id);
  //   }
  // }

};

//=============================================
// FUNCTION CALLS
//=============================================

generateProfiles();
console.log(getProfiles());
admin.app().delete();

//=============================================