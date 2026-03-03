import { auth, db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.loadMentorStudents = async function () {
  const user = auth.currentUser;
  const snap = await get(ref(db, "users/" + user.uid));
  const mentorData = snap.val();

  const studentsSnap = await get(ref(db, "users"));
  const students = studentsSnap.val();

  const list = document.getElementById("studentList");
  list.innerHTML = "";

  Object.keys(students).forEach(uid => {
    if (students[uid].grade === mentorData.assignedGrade) {
      list.innerHTML += `<li>${students[uid].name}</li>`;
    }
  });
};
