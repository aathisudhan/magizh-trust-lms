import { db } from "./firebase-config.js";
import { ref, push, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.addAssignment = async function () {
  const title = document.getElementById("title").value;
  const grade = document.getElementById("grade").value;

  await push(ref(db, "assignments/" + grade), {
    title,
    createdAt: Date.now()
  });

  alert("Assignment Added");
};

window.loadAssignments = async function (grade) {
  const snap = await get(ref(db, "assignments/" + grade));
  const data = snap.val();

  const list = document.getElementById("assignmentList");
  list.innerHTML = "";

  if (data) {
    Object.values(data).forEach(a => {
      list.innerHTML += `<li>${a.title}</li>`;
    });
  }
};
