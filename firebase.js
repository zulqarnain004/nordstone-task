import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBaGZr1Iaaf4SnAiubVw7XHFKuGQdsZhXE",
  authDomain: "nordstone-auth.firebaseapp.com",
  projectId: "nordstone-auth",
  storageBucket: "nordstone-auth.appspot.com",
  messagingSenderId: "471895767074",
  appId: "1:471895767074:web:659674e57cbf558a92b27b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const firestore = firebase.firestore();


// export const auth = getAuth()

// export default {app, auth};
// export { firebase, storage, firestore };

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, auth, firestore, storage };