import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnhiq2mgdRb7QFR9yigLi38ZrNnnZJdIk",
  authDomain: "drum-creator.firebaseapp.com",
  projectId: "drum-creator",
  storageBucket: "drum-creator.appspot.com",
  messagingSenderId: "782387272812",
  appId: "1:782387272812:web:c08ba033444c2ad8f58c49"
};


let app: firebase.app.App;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.apps[0];
}

console.log('firebase');

export const DRUMS_COLLECTION = app!.firestore().collection('drums');