import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// REGISTER
window.registerUser = async function () {
  const name = document.getElementById("name").value;
  const grade = document.getElementById("grade").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !grade || !email || !password) {
    alert("All fields required");
    return;
  }

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  await set(ref(db, "users/" + user.uid), {
    name,
    grade,
    email,
    role: "student",
    approved: false
  });

  alert("Registered! Wait for admin approval.");
  window.location.href = "login.html";
};

// LOGIN
window.loginUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "dashboard.html";
};

// LOGOUT
window.logoutUser = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
