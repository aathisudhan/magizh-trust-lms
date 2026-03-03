async function deleteUser(uid) {
    if (confirm("Are you sure you want to remove this user?")) {
        // Implement backend delete route call here
        console.log("Deleting user:", uid);
        const row = document.getElementById(`user-${uid}`);
        row.style.animation = "slideOut 0.5s forwards";
        setTimeout(() => row.remove(), 500);
    }
}

// Add CSS animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideOut {
        to { opacity: 0; transform: translateX(50px); }
    }
`;
document.head.appendChild(style);
