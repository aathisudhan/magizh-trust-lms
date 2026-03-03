import { db } from "./firebase-config.js";
import { ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Approve Students
window.loadPendingStudents = async function () {
  const snap = await get(ref(db, "users"));
  const users = snap.val();

  const list = document.getElementById("pendingList");
  list.innerHTML = "";

  Object.keys(users).forEach(uid => {
    if (!users[uid].approved && users[uid].role === "student") {
      list.innerHTML += `
        <li>
          ${users[uid].name} 
          <button onclick="approveUser('${uid}')">Approve</button>
        </li>`;
    }
  });
};

window.approveUser = async function (uid) {
  await update(ref(db, "users/" + uid), { approved: true });
  alert("Student Approved");
  loadPendingStudents();
};

// Promote Grade
window.promoteStudent = async function (uid, newGrade) {
  await update(ref(db, "users/" + uid), { grade: newGrade });
  alert("Grade Updated");
};
