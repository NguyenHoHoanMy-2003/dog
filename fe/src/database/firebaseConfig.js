// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6xirFF3YU5Au8I4Sb541bSTk0SO873q4",
  authDomain: "animaldata-e23b4.firebaseapp.com",
  databaseURL: "https://animaldata-e23b4-default-rtdb.firebaseio.com",
  projectId: "animaldata-e23b4",
  storageBucket: "animaldata-e23b4.firebasestorage.app",
  messagingSenderId: "98394430588",
  appId: "1:98394430588:web:072ac664f62c4b52307df9",
  measurementId: "G-KNVR6Y7QRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };