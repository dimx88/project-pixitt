import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCitcku88fvYIpVNKhgBNmWpbIpHK4qoag",

  authDomain: "project-pixley.firebaseapp.com",

  projectId: "project-pixley",

  storageBucket: "project-pixley.appspot.com",

  messagingSenderId: "880512120349",

  appId: "1:880512120349:web:8df800e5423fa444e378f4"

};


// Initialize firebase

const app = initializeApp(firebaseConfig);

//  Initialize services

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { db, auth, storage };