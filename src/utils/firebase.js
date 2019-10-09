import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://minpic-cf86d.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "minpic-cf86d.appspot.com",
}
firebase.initializeApp(config);
export const storageRef = firebase.storage();
export const databaseRef = firebase.database();
