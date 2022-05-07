import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBOC09p105xFDK3rPna5yD27NAkwVJ9F2k",
  authDomain: "health-web-e0179.firebaseapp.com",
  databaseURL: "https://health-web-e0179-default-rtdb.firebaseio.com",
  projectId: "health-web-e0179",
  storageBucket: "health-web-e0179.appspot.com",
  messagingSenderId: "722530679753",
  appId: "1:722530679753:web:9cd8fc76111c7ed7dac618",
  measurementId: "G-XPWYWSZ2Y3",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
