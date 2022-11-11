// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdyn4d2oXRQjI_ZCmuqYVs2jL7ivVY85s",
  authDomain: "stk-frontend-2d462.firebaseapp.com",
  projectId: "stk-frontend-2d462",
  storageBucket: "stk-frontend-2d462.appspot.com",
  messagingSenderId: "198760972876",
  appId: "1:198760972876:web:72c1562b54e5bcb8c86ae9",
  measurementId: "G-5XLTWJ6Q75"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
export default getFirestore();