const authHandler = {
    // Helper to send tokens to Flask
    async syncWithBackend(endpoint, idToken, extraData = {}) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, ...extraData })
        });
        return await response.json();
    }
};

// Global Logout
async function logoutUser() {
    await firebase.auth().signOut();
    window.location.href = '/logout';
}
