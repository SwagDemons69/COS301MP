// ============================================================================
// IMPORTS
// ============================================================================

require('dotenv').config();
const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');
const { Timestamp } = require('firebase-admin/firestore');
const { user } = require('firebase-functions/v1/auth');

// ============================================================================
// SETUP
// ============================================================================

const app = admin.initializeApp({
    projectId: 'twenty4-f9f8e'
});

const firestore = admin.firestore(app);
firestore.settings({
    host: "localhost:5003",
    ssl: false,
});


// ============================================================================
// MAIN
// ============================================================================

async function main(){
    const total = 9;
    faker.seed(123);
    seedProfiles(total);
}

async function seedProfiles(total){
    const profiles = generateProfiles(total);
    console.log('\x1b[32m%s\x1b[0m', 'Profiles Generated.');
    console.log('\x1b[37m%s\x1b[0m', 'Seeding Profiles. . . .');
    const batch = firestore.batch();

    profiles.forEach((profile) => {
        const profileRef = admin.firestore().collection('profiles').doc();
        profile.user_id = profileRef.id;
        batch.set(profileRef, profile);
    });

    try {
        await batch.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Profiles seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding profiles: ', error);
    }
    return profiles;
}


function generateProfiles(total){
    console.log('\x1b[37m%s\x1b[0m', 'Generating Profiles. . . .');
    const profiles = [];

    for(let i = 0; i < total; i++){
        const name = faker.name.firstName();
        const surname = faker.name.lastName();
        const profile = {
            user_id: "",
            timeOfExpiry: Date.now() / 1000,
            notPublic: false,
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
            followers: 0, 
            following: 0, 
            blocked: 0,    
            posts: 0,  
            notifications: []
        }
        profiles.push(profile);
    }
    return profiles;
}


main();