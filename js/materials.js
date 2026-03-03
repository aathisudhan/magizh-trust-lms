import { db } from "./firebase-config.js";
import { ref, push, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.addMaterial = async function () {
  const title = document.getElementById("matTitle").value;
  const link = document.getElementById("matLink").value;
  const grade = document.getElementById("matGrade").value;

  await push(ref(db, "materials/" + grade), {
    title,
    link
  });

  alert("Material Added");
};

window.loadMaterials = async function (grade) {
  const snap = await get(ref(db, "materials/" + grade));
  const data = snap.val();

  const list = document.getElementById("materialList");
  list.innerHTML = "";

  if (data) {
    Object.values(data).forEach(m => {
      list.innerHTML += `<li><a href="${m.link}" target="_blank">${m.title}</a></li>`;
    });
  }
};
