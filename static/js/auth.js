/**
 * Auth Logic: Handles Login/Logout and Session Sync
 */
const authHandler = {
    async syncWithBackend(endpoint, idToken, extraData = {}) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken, ...extraData })
            });
            return await response.json();
        } catch (error) {
            console.error("Backend Sync Error:", error);
            return { status: 'error', message: 'Network error' };
        }
    }
};

async function logoutUser() {
    try {
        await firebase.auth().signOut();
        // Redirect to Flask logout to clear server-side session
        window.location.href = '/logout';
    } catch (error) {
        console.error("Logout Error:", error);
    }
}
