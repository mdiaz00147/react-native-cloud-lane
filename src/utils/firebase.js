import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://minpic-cf86d.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "ENTER YOURS HERE",
  messagingSenderId: "ENTER YOURS HERE"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const usersRef = databaseRef.child("users")