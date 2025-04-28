import firebase from "firebase";

const firebaseConfig = {
    // apiKey: "AIzaSyAiXqk7tOuYM_VdDJ8iorMIDhXksMVrgf8",
    // authDomain: "testproject-fb1e5.firebaseapp.com",
    // projectId: "testproject-fb1e5",
    // storageBucket: "testproject-fb1e5.appspot.com",
    // messagingSenderId: "259861457792",
    // appId: "1:259861457792:web:58f777e655fef837296f65",
    // measurementId: "G-VXJNCF58V1"


    apiKey: "AIzaSyBAF56YIFKot0fbIdFY6whApdKcKEwYkx0",
  authDomain: "dumpyard-c1af2.firebaseapp.com",
  projectId: "dumpyard-c1af2",
  storageBucket: "dumpyard-c1af2.appspot.com",
  messagingSenderId: "230246280874",
  appId: "1:230246280874:web:e7fb52323fe124e59cead3",
  measurementId: "G-WV2DNBZPZ5"  




};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }