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
    faker.seed(123);
    //Changing these values will most likely break the  !!!!!!! - Im too lazy but ez fix
    const profileCount = 5;
    const postCount = 3;
    const chatCount = 2;
    const MessageCount = 4;
    const rootCommentCount = 2;
    const ChildCommentCount = 1;
    console.log('\x1b[37m%s\x1b[0m', '===================================');
    console.log('\x1b[37m%s\x1b[0m', '= RUNNING JOB: script/seed.js     =');
    console.log('\x1b[37m%s\x1b[0m', '===================================');
    
    
    const profiles = await seedProfiles(profileCount);
    const usernames = profiles.map(profile => profile.username);
    const userIds = profiles.map(profile => profile.user_id);
    const posts = await seedPosts(profiles, postCount);
    const postIds = posts.map(post => post.post_id);
    const chats = await seedChats(profiles, chatCount, MessageCount);
    const comments = await seedComments(userIds, usernames, postIds, posts.length, rootCommentCount, ChildCommentCount);
    console.log('\x1b[37m%s\x1b[0m', '===================================');
    console.log('\x1b[37m%s\x1b[0m', '=           JOB COMPLETE          =');
    console.log('\x1b[37m%s\x1b[0m', '===================================');
}

// ============================================================================
// MAIN FUCNTIONS
// ============================================================================

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
            timeOfExpiry: 420,
            notPublic: "false",
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
            followers: [], 
            following: [], 
            blocked: [],    
            posts: [],  
            notifications: []
        }
        profiles.push(profile);
    }
    return profiles;
}

async function seedPosts(profiles, total){
    const userIds = profiles.map(profile => profile.user_id);
    const posts = generatePosts(userIds, total);
    console.log('\x1b[32m%s\x1b[0m', 'Posts Generated.');
    console.log('\x1b[37m%s\x1b[0m', 'Seeding Posts. . . .');
    const batch = firestore.batch();
    let userCnt = 0;
    let postCnt = 1;
    posts.forEach((post) => {
        const postRef = admin.firestore().collection(`profiles/${userIds[userCnt]}/posts`).doc();
        post.post_id = postRef.id;
        batch.set(postRef, post);
        if(postCnt % 3 == 0) { userCnt++; postCnt = 1; } else { postCnt++; };
    });


    try {
        await batch.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Posts seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding posts: ', error);
    }
    return posts;
}

function generateRandomTimestamp() {
    const twoWeeksAgo = Date.now() - 1209600000; // 2 weeks in milliseconds trust me bro
    const randomTimestamp = Math.floor(Math.random() * (Date.now() - twoWeeksAgo) + twoWeeksAgo);
    return new Timestamp(Math.floor(randomTimestamp / 1000), 0);
  }

function generatePosts(userIds, total){
    console.log('\x1b[37m%s\x1b[0m', 'Generating Posts. . . .');
    const posts = [];
    for(let j = 0; j < userIds.length; j++){
        for(let i = 0; i < total; i++){
            const post = {
                post_id : "",
                user_id : userIds[j],
                content : faker.image.image(640, 480, true),
                caption : faker.lorem.words(3),
                likes : [],
                timeStamp : generateRandomTimestamp(),
                shares : 0,
                kronos : 0,
                comments : [],
                categories : [],
                taggedUsers : []
            }
            posts.push(post);
        }
    }
    return posts;
}

async function seedChats(profiles, total, total2){
    const userIds = profiles.map(profile => profile.user_id);
    const chatResponse = generateChats(userIds, total, total2);
    console.log('\x1b[32m%s\x1b[0m', 'Chats Generated.');
    console.log('\x1b[32m%s\x1b[0m', 'Chat Messages Generated.');
    const chats = chatResponse.chats;
    const messages = chatResponse.messages;

    console.log('\x1b[37m%s\x1b[0m', 'Seeding Chats. . . .');
    const batch = firestore.batch();

    let userCnt = 0;
    let chatCnt = 1;
    chats.forEach((chat) => {
        //Create chats
        const chatRef = admin.firestore().collection(`profiles/${userIds[userCnt]}/chats/`).doc(chat.recipient);
        batch.set(chatRef, chat);
        
        if(chatCnt % 2 == 0) { userCnt++; chatCnt = 1; } else { chatCnt++; };
    });


    try {
        await batch.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Chats seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding chats: ', error);
    }

    console.log('\x1b[37m%s\x1b[0m', 'Seeding Chat messages. . . .');

    const batch2 = firestore.batch();
    let user = 0;
    let cnt = 1;
    chatCnt = 0;
    messages.forEach((message) => {
        const chatRef2 = admin.firestore().collection(`profiles/${userIds[user]}/chats/${chats[chatCnt].recipient}/chat`).doc();
        batch2.set(chatRef2, message);
        if(cnt % 4 == 0) { chatCnt++;  };
        if(cnt % 8 == 0){ user++; cnt = 1;} else { cnt++ };
    })
    try {
        await batch2.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Chat messages seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding chat messages: ', error);
    }


    return chats;
}

function generateChats(userIds, total, total2){
    console.log('\x1b[37m%s\x1b[0m', 'Generating Chats. . . .');
    let rand = 0;
    const chats = [];
    const chatsMessages = [];
    for(let i = 0;i < userIds.length; i++ ){
        let recipients = [];
        for(let j = 0; j < total; j++){
            rand = faker.random.numeric(1);
            while( ( userIds[i] == userIds[rand] || recipients.includes(userIds[rand]) ) || rand >= userIds.length)
            { rand = faker.random.numeric(1); };

            recipients.push(userIds[rand]);

            const chat = {
                recipient: userIds[rand]
            };
            chats.push(chat);

            for(let k = 0;k < total2; k++){
                
                const chatMessage = {
                    sender : userIds[i],
                    receiver : userIds[rand],
                    timeStamp : Timestamp.now(),
                    payload : faker.lorem.words()
                }
                chatsMessages.push(chatMessage);
            }
        }
    }
    return { chats: chats, messages: chatsMessages};
}
//This function made me want to jump
async function seedComments(userIds, usernames, postIds, postCount, total, total2){
    const response = generateComments(usernames, postCount, total, total2);
    console.log('\x1b[32m%s\x1b[0m', 'Root Comments Generated.');
    console.log('\x1b[32m%s\x1b[0m', 'Child Comments Generated.');
    //console.log(response.rcomments.length) //30 - 15 for child
    const rcomments = response.rcomments;
    const ccomments = response.ccomments;

    const batch = firestore.batch();
    let userCnt = 0;
    let postCnt = 0;
    let rcomCnt = 1;
    let cnt = 1;
    
    rcomments.forEach((rcomment) => {
        //Create root comments
        const rcommentRef = admin.firestore().collection(`profiles/${userIds[userCnt]}/posts/${postIds[postCnt]}/root-comments`).doc();
        rcomment.root_comment_id = rcommentRef.id;
        batch.set(rcommentRef, rcomment);
        if(rcomCnt % total == 0) { postCnt++; rcomCnt = 1; } else { rcomCnt++; };
        if(cnt % 6 == 0) { userCnt++; cnt = 1; } else { cnt++; }
    });

    try {
        await batch.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Root Comments seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding root comments: ', error);
    }

    const batch2 = firestore.batch();
    userCnt = 0;
    postCnt = 0;
    rcomCnt = 1;
    cnt = 1;
    rcomId = 0;
    let postCounter = 1;
    let cnt2 = 1;
    for(let j = 0;j < ccomments.length;j++){
        const rcomments2 = await getRcommentIds(userIds[userCnt], postIds[postCnt]);
        
        const ccommentRef = admin.firestore()
        .collection(`profiles/${userIds[userCnt]}/posts/${postIds[postCnt]}/root-comments/${rcomments2[rcomId]}/child-comments`).doc();
        ccomments[j].child_comment_id = ccommentRef.id;
        batch2.set(ccommentRef, ccomments[j]);
    
        if(postCounter % 2 == 0) { postCounter = 1; postCnt++; rcomId = 0; } else { postCounter++; rcomId++;};
        if(cnt % 6 == 0) { userCnt++; cnt = 1; } else { cnt++; }
    }

    try {
        await batch2.commit();
        console.log('\x1b[32m%s\x1b[0m', 'Child Comments seeded successfully.');
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error seeding root comments: ', error);
    }

}

function generateComments(usernames, postCount, total, total2){
    console.log('\x1b[37m%s\x1b[0m', 'Generating Comments. . . .');
    const rcomments = [];
    const ccomments = [];
    for(let j = 0;j < postCount; j++){
        for(let i = 0;i < total; i++){
            let rand = 0;
            while(rand >= usernames.length)
            { rand = faker.random.numeric(1); };

            const rcomment = {
                root_comment_id : "",
                created_by: usernames[rand],
                content: faker.lorem.words(),
                kronos: faker.random.numeric(1),
                likes : faker.random.numeric(1),
                comments : []
            }
            for(let j = 0;j < total2; j++){

                rand = faker.random.numeric(1); 
                while(rand >= usernames.length)
                { rand = faker.random.numeric(1); };
                const ccomment = {
                    child_comment_id : "",
                    created_by: usernames[rand],
                    content: faker.lorem.words(),
                    kronos: faker.random.numeric(1),
                    likes : faker.random.numeric(1)
                }
                ccomments.push(ccomment);
            }
            rcomments.push(rcomment);
        }
    }
    return { rcomments: rcomments, ccomments: ccomments };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

    async function getRcommentIds(user, post){
        const rcomments2 = await admin.firestore().collection(`profiles/${user}/posts/${post}/root-comments`).get();
        let comments = [];
        for(let i = 0; i < rcomments2.docs.length; i++){
            comments.push(rcomments2.docs[i].data().root_comment_id);
        }
        return comments;
    }

// ============================================================================
// MAIN
// ============================================================================

main();


// ============================================================================