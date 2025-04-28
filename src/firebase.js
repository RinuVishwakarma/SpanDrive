import firebase from "firebase";

const firebaseConfig = {
   


REACT_APP_API_KEY=YOUR_FIREBASE_API_KEY 
REACT_APP_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN 
REACT_APP_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID 
REACT_APP_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET 
REACT_APP_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID 
REACT_APP_APP_ID=YOUR_FIREBASE_APP_ID  
REACT_APP_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID 





};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }
