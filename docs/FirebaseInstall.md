# Firebase Details
1. Clone the devFirebase branch
	- DO NOT COMMIT THIS BRANCH TO MAIN, MAIN REMAINS A CLEAN COPY FOR NOW.
	- This branch is where we figure out what's cracking in Firebase.
2. You will probably need to login first, for that use:
```
firebase login
```
After running that command you will be taken out to your browser and you will be logged into firebase into your google account. Same account as your personal account that was added to the Firebase console. (I.e. the email account you received the firebase message in).
3. Then, we are currently using the development branch so type into your terminal:

```
firebase use development
```
4. Dev container
The below install was needed, but this is now done via the devcontainer. Probably not needed anymore, use at your own discretion and if necessary.
```
$ npm install -g firebase-tools  
```

5. Yarn. Run the three following commands in SEPERATE terminals.

```
yarn start:api:dev

yarn start:emulators   OR   yarn start:emulators:imported

yarn start:app:dev
```
6. Below are dangerous CLI commands, don't just use. Deploy deploys the website, and init creates all the relevant settings.

```
$ firebase init
$ firebase deploy
```

Ports for emulators: All other emulator ports can be seen from 5001

```
i  Emulator UI already enabled with port: 5001
i  Website is at port: 4200
```
 

Then we were given these details, that are all important for our firebase config.
```
  
const firebaseConfig = { 
apiKey: "AIzaSyBuFcVrjnQPeKrB_UbAE-LXE1nZgRAxu3w",  
authDomain: "cos301mp.firebaseapp.com",  
databaseURL: "https://cos301mp-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "cos301mp",
storageBucket: "cos301mp.appspot.com", 
messagingSenderId: "871301114355", 
appId: "1:871301114355:web:d0fd3b71a8c386a11a8a86",
measurementId: "G-P3B71MT2D7"
};
  
// Initialize Firebase

  
const app = initializeApp(firebaseConfig);

  
const analytics = getAnalytics(app);
```

If you need access to Firebase via firebase login, please contact Dino or Conrad.