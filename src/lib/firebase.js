// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGpcMCqamyYhJKa9QCVyEaJVCC4Yr_cIg",
  authDomain: "notebook-b367a.firebaseapp.com",
  projectId: "notebook-b367a",  
  storageBucket: "notebook-b367a.appspot.com",
  messagingSenderId: "398657830681",
  appId: "1:398657830681:web:75c80a389bcfcac4f5cf88",
  measurementId: "G-5EV0F0S62F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);