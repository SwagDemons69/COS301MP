ConradStras
#1338

Prof G — 03/28/2023 10:26 PM
user
Ruan — 03/28/2023 10:26 PM
Why would the user need a kronos value?
Prof G — 03/28/2023 10:26 PM
Is that not their current "time"?
Each should have their own bank
Ruan — 03/28/2023 10:26 PM
The time of expiry is basically you kronos, you can just calculate that...
Else every second we have to update the whole database
Prof G — 03/28/2023 10:27 PM
oh its a calculation
Bit sus how we just call time kronos
But I understand
Ruan — 03/28/2023 10:27 PM
I do not make the rules
Prof G — 03/28/2023 11:18 PM
Fighting wars getting array lengths
Prof G — 03/28/2023 11:40 PM
Vietnam war right here
Havent seen so much red since 216
Prof G — 03/29/2023 12:11 AM
Array length
Image
No problem
I think I want to jump now 
Thats enough full stack dev for tonight
Robert Officer — 03/29/2023 12:15 AM
Well done man, proper shift
Prof G — 03/29/2023 12:30 AM
Not me trying to make injection tokens, actions selectors, normal tokens💀 
Prof G — 03/30/2023 11:24 PM
Robert Officer — 03/30/2023 11:24 PM
Damn this Jake dude has some skills
pity we don't have him on our team
Prof R — 03/30/2023 11:28 PM
The database:
00 | AfsDj;lasDR420FcwEuNCa;n           | Asf;hJiawENiCEAWNi;weNIcenws
01 | ArKBeWCni;wEcIn FWEjilFWnIlfwmWwNJ | cWWEniOClnWS,In69SEP  nsnIsen
Prof G — 03/30/2023 11:35 PM
🥵🥵🥵🥵🥵🥵🥵
Prof R — 03/30/2023 11:36 PM
Lucky we got Chad Jake the chadgrammer on our team instead
Prof G — 03/30/2023 11:43 PM
Prof G — 04/09/2023 10:28 AM
Post interface:
"image" and "video" field is redundant as only one can be used. "Content" field will be used.

Renamed time to "timeStamp"

Removed notPublic

Only profiles are private and public - posts can be seen by all followers.
 
Lukas Anthonissen — 04/09/2023 6:47 PM
Shap. Thanks for the heads-up. Will update the UML and data_engineer_notes
Ruan — 04/10/2023 8:32 PM
Newest version of both mock_data and our notes
# COS 301 Mini-Project

## Notes

User starts with 336 hours of time when creating account.

Expand
data_engineer_notes.md
11 KB
{
    "posts" : [
        {
            "post_id": 69,
            "user": 10398140,
            "timestamp": 63216132236,
Expand
mock_data.json
14 KB
Ruan — 04/11/2023 8:56 AM
Forgot to remove the notPublic yesterday, everything should be fine now
# COS 301 Mini-Project

## Notes

User starts with 336 hours of time when creating account.

Expand
data_engineer_notes.md
11 KB
{
    "posts" : [
        {
            "post_id": 69,
            "user": 10398140,
            "timestamp": 63216132236,
Expand
mock_data.json
14 KB
Prof G — 04/11/2023 3:03 PM
@Data Geeks Hows it going mense
Ruan — 04/11/2023 5:14 PM
Yeah we struggled for a while on but stopped now, going to do a few other pracs and will try further tomorrow, I did manage to add allot of mock data to firestore though. And at your side? 
Prof G — 04/11/2023 5:14 PM
awe
check chat
Ruan — 04/11/2023 5:15 PM
Looks good, so are you going to change the database?
Prof G — 04/11/2023 5:16 PM
Thinking about it yea 
ill send a message when i make a decision
Ruan — 04/11/2023 5:16 PM
Shap, when you do just let us know cause we'll have to change quite a few things then
Prof G — 04/12/2023 2:22 PM
Ive decided storing actual post objects per user would be much easier. Also thinking about it if i wanted to get my posts its easier to go to my array than search the global posts with each post_id
Robert Officer — 04/12/2023 2:27 PM
Thought that was the case already?
Prof G — 04/12/2023 2:28 PM
i think it was but idk got lost in discussion or wasnt solidified
Just confirming it with the data team
Ruan — 04/13/2023 9:15 AM
Yeah initially that was the case but we discussed about how post are going to be harder to find and filter for things like home feed. I'll quickly update everything though 👌
Prof G — 04/13/2023 9:16 AM
also for like notifications in a user or comments in a post
all arrays must store objects and not ids to some global pool
Ruan — 04/13/2023 9:17 AM
Shap, Notifications is already stored in the user's profile, just need to move posts to it
Ruan — 04/13/2023 9:46 AM
Updated database. Allot of things changed so please let me know if there is any errors
# COS 301 Mini-Project

## Notes

User starts with 336 hours of time when creating account.

Expand
data_engineer_notes.md
11 KB
{    
    "users" : [
        {
            "user_id" : 10398140,
            "username": "DieSeeKat",
            "name": "Lukas Anthonissen",
Expand
mock_data.json
14 KB
Prof G — 04/13/2023 9:47 AM
👍
Lukas Anthonissen — Today at 10:16 AM
# COS 301 Mini-Project

## Notes

User starts with 336 hours of time when creating account.

### Data Engineer"s Notes

Any field value written as /\*\<tableName>\*/ indicates a reference to the table by the object's _id field.

## Database Planning

#### User

- Username (string)
- Name (string)
- Email (string)
- Password (string)
- Bio (string)
- Profile Picture (string)
- Province (string) Will be in the list {gp, nw, ec, wc, nc, lp, mp, kzn, fs}
- Time of expiry (UNIX timestamp as int)
- Posts (array[Post])
- Followers (array[User])
- Following (array[User])
- Likes Left (int)
- Dislikes Left (int)
- Comments Likes Left (int)
- notPublic (boolean)
- Follow Requests (array[User])
- Blocked Users (array[User])
- Notifications (array[Notification])
- Chats (array[Chat])

```json

"user" : {
    "user_id" : 1,
    "username": "UserName",
    "name": "Name Surname",
    "email": "email@example.com",
    "password": "pa5sW0rd_ha5h", // hashed password
    "bio" : "bio of the user",
    "profilePicturePath" : "C:\\path\to\\image.ext",
    "province" : "province abbreviation",
    "timeOfExpiry": 420, // UNIX time code indicating when the account will expire
    "likesLeft": 10,
    "dislikesLeft" : 10,
    "commentLikesLeft" : 10,
    "notPublic": true, // whether the account is public or private
    "posts": [/*Post*/],
    "followRequests": [/*User*/],
    "followers": [/*User*/],
    "following": [/*User*/],
    "blocked" : [/*User*/],
    "notifications": [/*Notification*/],
	"chats": [/*Chat*/],
}

```

#### Notifications

- Text (string)
- reference ID (int)

##### Types of notifications

- Comment Likes
- Comments
- Likes
- Dislikes
- Message
- Follow Request
- Follows

```json

"notification" : {
    "notification_id" : 1,
    "text" : "Notification text",
    "commentLikes" : 1,
    "comment" : 1,
    "likes" : 1,
    "dislikes" : 1,
    "message" : 1,
    "followRequest" : 1,
    "follow" : 1,
}

```

#### Post

- Content (path to image or video)
- Caption (string)
- Comments (array[RootComment])
- Likes (int)
- TimeStamp (int)
- Kronos (int)
... (349 lines left)
Collapse
data_engineer_notes.md
11 KB
﻿
# COS 301 Mini-Project

## Notes

User starts with 336 hours of time when creating account.

### Data Engineer"s Notes

Any field value written as /\*\<tableName>\*/ indicates a reference to the table by the object's _id field.

## Database Planning

#### User

- Username (string)
- Name (string)
- Email (string)
- Password (string)
- Bio (string)
- Profile Picture (string)
- Province (string) Will be in the list {gp, nw, ec, wc, nc, lp, mp, kzn, fs}
- Time of expiry (UNIX timestamp as int)
- Posts (array[Post])
- Followers (array[User])
- Following (array[User])
- Likes Left (int)
- Dislikes Left (int)
- Comments Likes Left (int)
- notPublic (boolean)
- Follow Requests (array[User])
- Blocked Users (array[User])
- Notifications (array[Notification])
- Chats (array[Chat])

```json

"user" : {
    "user_id" : 1,
    "username": "UserName",
    "name": "Name Surname",
    "email": "email@example.com",
    "password": "pa5sW0rd_ha5h", // hashed password
    "bio" : "bio of the user",
    "profilePicturePath" : "C:\\path\to\\image.ext",
    "province" : "province abbreviation",
    "timeOfExpiry": 420, // UNIX time code indicating when the account will expire
    "likesLeft": 10,
    "dislikesLeft" : 10,
    "commentLikesLeft" : 10,
    "notPublic": true, // whether the account is public or private
    "posts": [/*Post*/],
    "followRequests": [/*User*/],
    "followers": [/*User*/],
    "following": [/*User*/],
    "blocked" : [/*User*/],
    "notifications": [/*Notification*/],
	"chats": [/*Chat*/],
}

```

#### Notifications

- Text (string)
- reference ID (int)

##### Types of notifications

- Comment Likes
- Comments
- Likes
- Dislikes
- Message
- Follow Request
- Follows

```json

"notification" : {
    "notification_id" : 1,
    "text" : "Notification text",
    "commentLikes" : 1,
    "comment" : 1,
    "likes" : 1,
    "dislikes" : 1,
    "message" : 1,
    "followRequest" : 1,
    "follow" : 1,
}

```

#### Post

- Content (path to image or video)
- Caption (string)
- Comments (array[RootComment])
- Likes (int)
- TimeStamp (int)
- Kronos (int)
- Categories (array["string"])
- Tagged Users (array[User])
- Share Count (int)

```json

"post" : {
    "post_id": 1,
    "content" : "C:\\path\to\\imageOrVideo.ext",
    ext", // only one of these fields will be displayed.
    "caption": "Caption of the post",
    "likes": 0,
    "timeStamp": 1234567890,
    "shares" : 0,
    "kronos" : 0,
    "comments": [/*RootComment*/],
    "categories": [/*String*/], // Max 3
    "taggedUsers" : [/*User*/]
}

```

#### RootComment

- Kronos (int)
- Text (string)
- User (User)
- Likes (int)
- ChildComments (array[ChildComment])

```json

"rootComment" : {
    "root_comment_id": 1,
    "kronos" : 0,
    "text": "Comment",
    "user": /*User*/,
    "likes": 0,
    "comments": [/*ChildComment*/],
}

```

#### ChildComment

- Kronos (int)
- Text (string)
- User (User)
- Likes (int)

```json

"childComment" : {
    "child_comment_id": 1,
    "kronos" : 0,
    "text": "Comment",
    "user": /*User*/,
    "likes": 0,
}
```

#### Direct Messages

```json

"chats" : [
    {
        "chat_id": 3523,
        "chatName": "Name of the Chat",
        "users" : [/*User*/],
        "messages" : [
            {
                "message_id": 235233,
                "from" : /*User*/,
                "timeStamp" : 129348768213,
                // caption and post are optional, but at least one is always necessary.
                "caption" : "I love you <3",
                "post" : /*Post*/,
            }
        ],
    }
]

```

#### Local Leaderboard

Top 24. Updated every X hours. The top ten are then saved in the "localLeaderboard" array.

There will exist one for each province and one for the global leaderboard.

```json
"leaderboards" : {
    "gauteng" : [/*User*/],
    "limpopo" : [/*User*/],
    "mpumulanga" : [/*User*/],
    "kzn" : [/*User*/],
    "northWest" : [/*User*/],
    "westCape" : [/*User*/],
    "eastCap" : [/*User*/],
    "northCape" : [/*User*/],
    "freestate" : [/*User*/],
    "global" : [/*User*/],
}
```

#### Example

```json
{
    "users" : [
        {
            "user_id" : 10398140,
            "username": "DieSeeKat",
            "name": "Lukas Anthonissen",
            "email": "lukas007@gmail.com",
            "password":   "ynw8yw82n283c2doNdq6T*&nqn",
            "bio" : "live love life",
            "profilePicturePath" : "C:\\images\\gigachad.jpg",
            "province" : "gp",
            "timeOfExpiry": 33235271617,
            "likes": 10,
            "dislikes": 5,
            "commentLikes" : 7,
            "notPublic" : true,
            "posts": [{
                "post_id": 69,
                "content": "C:\\images\\dodgeCoinMeme.jpg",
                "caption": "Crypto go brrrrrr",
                "likes": 10731827,
                "shares" : 1,
                "timeStamp" : 2938729834,
                "comments": [
                {
                    "root_comment_id" : 3424,
                    "text": "so funny ROFLMAOCOL",
                    "user": 8971892,
                    "likes": 234,
                    "comments": [
                        {
                            "child_comment_id": 879853,
                            "text": "ik right?",
                            "user": 10398140,
                            "likes": 12
                        }
                    ]
                }
            ],
            "categories": ["memes","crypto"], 
            "taggedUsers" : [8971892]
            }],
            "followers": [8971892],
            "following": [8971892],
            "followRequests": []
        },
        {
            "user_id" : 8971892,
            "username": "RuRu",
            "name": "Ruan Rossouw",
            "email": "ruanRos@gmail.com",
            "password": "ynw8yw82n283c2doNdq6T*&nqn",
            "bio" : "UP student",
            "profilePicturePath" : "C:\\images\\superchad.pdf",
            "province" : "gp",
            "timeOfExpiry": 1678362817,
            "likes": 6,
            "dislikes": 10,
            "commentLikes" : 2,
            "notPublic" : true,
            "posts": [],
            "followers": [10398140],
            "following": [10398140],
            "followRequests": []
        }
    ],

    "chats" : [
        {
            "chat_id":235232,
            "chatName": "Demons",
            "users" : [10398140, 8971892],
            "messages" : [
                {
                    "message_id" : 24987,
                    "from" : 10398140,
                    "timeStamp" : 129348768213,
                    "caption" : "I'm going to play LoL at 8, wanna join?"
                },
                {
                    "message_id" : 24988,
                    "from" : 8971892,
                    "timeStamp" : 129348234233,
                    "caption" : "Sure! I'll probably hop on at about half 9"
                },
                {
                    "message_id" : 24989,
                    "from" : 8971892,
                    "timeStamp" : 129348233523,
                    "post" : 69
                },
                {
                    "message_id" : 24990,
                    "from" : 8971892,
                    "timeStamp" : 129348238974,
                    "caption" : "BTW this post is hillarious!!!"
                },
                {
                    "message_id" : 24991,
                    "from" : 10398140,
                    "timeStamp" : 129348664871,
                    "caption" : "sus"
                }
            ]
        }
    ],

    "leaderboards" : {
        "global" : [10398140, 8971892],
        "gauteng" : [10398140, 8971892],
        "limpopo" : [],
        "mpumalanga" : [],
        "kzn" : [],
        "northWest" : [],
        "westCape" : [],
        "eastCap" : [],
        "northCape" : [],
        "freestate" : []
    }
}

```

# UML Diagram

<div align="center">

```mermaid

---
title: Twenty4
---

erDiagram

    User ||--o{ Post : creates
    Post ||--o{ RootComment : has
    RootComment ||--o{ ChildComment : has
    User ||--o{ RootComment : writes
    User ||--o{ ChildComment : writes
    User }|--o{ Chat : participates_in
    User }o--o{ Message : writes
    User ||--o{ Notification : has
    Chat }o--o{ Message : contains
    User }o--o{ Leaderboards : is_on

    User {
        int user_id PK
        string username 
        string name
        string email
        string password
        string bio
        string profilePicturePath
        string province
        int timeOfExpiry
        int likesLeft
        int dislikesLeft
        int commentLikesLeft
        bool z
        Post[] posts
        User[] followRequests
        User[] followers
        User[] following
        User[] blocked
        Notification[] notifications
        Chats[] chats
    }

    Notification {
        int notification_id PK
        string text
        int commentLikes
        int likes
        int dislikes
        int message
        int followRequest
        int follow
    }

    Post {
        int post_id PK
        string content
        string caption
        int likes
        int timeStamp
        int shares
        int kronos
        RootComment[] comments
        string[] categories
        User[] taggedUsers
    }

    RootComment {
        int root_comment_id PK
        string text
        User user
        int likes
        ChildComment[] comments
    }

    ChildComment {
        int child_comment_id PK
        string text
        User user
        int likes
    }

    Chat {
        int chat_id PK
        string chatName
        User[] users
        Message[] messages
    }

    Message {
        int message_id PK
        User from
        int timeStamp
        string caption
        Post post
    }

    Leaderboards {
        User[] global
        User[] gauteng
        User[] limpopo
        User[] mpumalanga
        User[] kzn
        User[] northCape
        User[] westCape
        User[] eastCape
        User[] northWest
        User[] freestate
    }


```

</div>
data_engineer_notes.md
11 KB