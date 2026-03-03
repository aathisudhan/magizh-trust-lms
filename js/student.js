import { auth, db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.loadStudentData = async function () {
  const user = auth.currentUser;
  const snap = await get(ref(db, "users/" + user.uid));
  const data = snap.val();

  document.getElementById("studentName").innerText = data.name;
  document.getElementById("studentGrade").innerText = data.grade;
};
