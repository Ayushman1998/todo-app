// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAloBJl3HhndSZyXgrJQJiV4_HfAmjMmIs",
  authDomain: "todo-app-897bd.firebaseapp.com",
  projectId: "todo-app-897bd",
  storageBucket: "todo-app-897bd.appspot.com",
  messagingSenderId: "319551920982",
  appId: "1:319551920982:web:4bf541eb7a8fd14fa714f7",
  measurementId: "G-BVJB85SCFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;