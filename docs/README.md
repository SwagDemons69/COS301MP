# Mini-Project 2023

## Requirements

The following items are required to run this project:

- Docker


## Get Started


1. Clone the repo

```sh
git clone https://github.com/SwagDemons69
```
## Might be needed:

1. Install dependencies

```sh
cd path/to/project
yarn install
```

2. Add Firebase configurations

See files:

- .firebaserc
- .env
- .env.pod

and find and replace "<REPLACE_ME>"

3. Run the stack:

Run these commands in separate terminals:

```sh
yarn start:api:dev
yarn start:emulators
yarn start:app:dev
```

4. CLI:

If you want to run the cli for admin, scripts, migrations etc.

```sh
yarn build:cli:prod
GOOGLE_APPLICATION_CREDENTIALS=.keys/<REPLACE ME WITH SERVICE ACCOUNT KEY.json> FIRESTORE_EMULATOR_HOST=localhost:5003 node dist/apps/cli/main.js <REPLACE ME WITH COMMAND>
```

## Emulators:

Once the emulators are up, please go to http://localhost:5001 to see the Emulator UI

## Notes!!:

- When creating your Firebase authentication, hosting, storage, functions. Make sure to use the same location throughout. (MAKE SURE TO SET "Default GCP resource location" in Project Settings in Firebase Console. If you do not do this, the app will not work)
- The app is built to be a PWA. (See: So if you deploy it to prod, you can install the app on iOS by adding to home screen or using Android by installing through Chrome)