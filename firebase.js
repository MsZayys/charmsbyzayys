// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA4q05UMycKXKV98awLWZtYV4X7Eh-GQs",
  authDomain: "charms-by-zayys.firebaseapp.com",
  projectId: "charms-by-zayys",
  storageBucket: "charms-by-zayys.firebasestorage.app",
  messagingSenderId: "441723825208",
  appId: "1:441723825208:web:8581692fff778b92fc0acd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where
};