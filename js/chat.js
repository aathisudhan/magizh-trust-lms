import { auth, db } from "./firebase-config.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.sendMessage = async function (grade) {
  const message = document.getElementById("chatInput").value;
  const user = auth.currentUser;

  await push(ref(db, "chats/" + grade), {
    uid: user.uid,
    message,
    time: Date.now()
  });

  document.getElementById("chatInput").value = "";
};

window.loadChat = function (grade) {
  const chatRef = ref(db, "chats/" + grade);

  onValue(chatRef, snapshot => {
    const data = snapshot.val();
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    if (data) {
      Object.values(data).forEach(msg => {
        chatBox.innerHTML += `
          <div class="chat-message">
            ${msg.message}
          </div>`;
      });
    }
  });
};
