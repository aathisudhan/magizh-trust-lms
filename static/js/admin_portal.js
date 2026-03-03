/**
 * Admin Portal: User management and system stats
 */
async function loadAdminData() {
    const tableBody = document.getElementById('userTableBody');
    const userCountEl = document.getElementById('userCount');

    // Real-time listener for users from Firebase (Client-side)
    const usersRef = firebase.database().ref('users');
    
    usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        tableBody.innerHTML = '';
        let count = 0;

        if (users) {
            Object.keys(users).forEach(uid => {
                const user = users[uid];
                count++;
                const row = document.createElement('tr');
                row.id = `user-${uid}`;
                row.innerHTML = `
                    <td>${user.email}</td>
                    <td><span class="role-badge role-${user.role}">${user.role}</span></td>
                    <td>Active</td>
                    <td>
                        <button class="btn-icon" onclick="deleteUser('${uid}')" title="Delete">🗑️</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        userCountEl.innerText = count;
    });
}

async function deleteUser(uid) {
    if (confirm("Are you sure you want to remove this user? This cannot be undone.")) {
        try {
            // 1. Remove from Firebase Realtime DB
            await firebase.database().ref(`users/${uid}`).remove();
            
            // 2. Visual Animation
            const row = document.getElementById(`user-${uid}`);
            if (row) {
                row.style.animation = "slideOut 0.5s forwards ease-in";
                setTimeout(() => row.remove(), 500);
            }
            console.log("User deleted successfully:", uid);
        } catch (error) {
            alert("Error deleting user: " + error.message);
        }
    }
}

// Global Animation Style for Deletion
if (!document.getElementById('admin-animations')) {
    const style = document.createElement('style');
    style.id = 'admin-animations';
    style.innerHTML = `
        @keyframes slideOut {
            to { opacity: 0; transform: translateX(50px); filter: blur(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Initial Load
document.addEventListener('DOMContentLoaded', loadAdminData);
