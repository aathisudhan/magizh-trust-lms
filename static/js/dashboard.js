/**
 * Student Dashboard: Fetches and displays learning materials
 */
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('materials-container');
    if (!container) return;

    try {
        // Fetch materials from Flask API (which talks to Firebase)
        const response = await fetch('/api/materials');
        const materials = await response.json();

        // Clear skeletons
        container.innerHTML = '';

        if (Object.keys(materials).length === 0) {
            container.innerHTML = '<p class="text-sub">No lessons available yet.</p>';
            return;
        }

        // Inject Cards
        Object.keys(materials).forEach((key, index) => {
            const item = materials[key];
            const card = document.createElement('div');
            card.className = 'material-card';
            card.innerHTML = `
                <div class="card-thumb">📚</div>
                <div class="card-content">
                    <h4>${item.title || 'Untitled Lesson'}</h4>
                    <p>${item.description || 'No description provided.'}</p>
                    <button class="primary-btn ripple" style="width:100%; margin-top:10px;">View Lesson</button>
                </div>
            `;
            container.appendChild(card);

            // Staggered Animation Logic
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

    } catch (error) {
        console.error("Dashboard Load Error:", error);
        container.innerHTML = '<p>Error loading materials.</p>';
    }
});
