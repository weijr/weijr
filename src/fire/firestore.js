import * as firebase from 'firebase';
import 'firebase/firestore';


const config = {
  apiKey: "AIzaSyCA0rBrs0L1ypciJ-3-GcycOkBu7UrtY1s",
  authDomain: "weijr-up.firebaseapp.com",
  databaseURL: "https://weijr-up.firebaseio.com",
  projectId: "weijr-up",
  storageBucket: "",
  messagingSenderId: "198786688745"
}


firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const userById = id => db.collection('users').doc(id);
export const gameById = id => db.collection('game').doc(id);
export default firebase;

