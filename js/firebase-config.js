// Firebase SDK v10 (modular)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5aJDFHXfgqFrLhvYUMrCwNY7BFB6T6Mo",
  authDomain: "magizh-trust-lms.firebaseapp.com",
  projectId: "magizh-trust-lms",
  storageBucket: "magizh-trust-lms.firebasestorage.app",
  messagingSenderId: "728154940194",
  appId: "1:728154940194:web:8d530bdd61bc984285bb7b",
  measurementId: "G-J18D326HV5"
};

export const auth = getAuth(app);
export const db = getDatabase(app);
