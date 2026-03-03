import { auth, db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snapshot = await get(ref(db, "users/" + user.uid));
  const data = snapshot.val();

  if (!data.approved && data.role === "student") {
    alert("Waiting for admin approval.");
    auth.signOut();
  }

  const page = window.location.pathname;

  if (page.includes("admin.html") && data.role !== "admin") {
    window.location.href = "dashboard.html";
  }

  if (page.includes("mentor.html") && data.role !== "mentor") {
    window.location.href = "dashboard.html";
  }
});
