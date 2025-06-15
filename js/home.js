// Home page functionality
import { auth } from './firebase-config.js';
import { 
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Check authentication state
document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const userEmailElement = document.getElementById('userEmail');
            if (userEmailElement) {
                const displayName = user.displayName || user.email.split('@')[0];
                userEmailElement.textContent = `Welcome, ${displayName}!`;
            }
        } else {
            // User is signed out, redirect to login page
            window.location.href = 'index.html';
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            try {
                await signOut(auth);
                // Redirect will happen automatically due to onAuthStateChanged
            } catch (error) {
                console.error('Logout error:', error);
                alert('Error signing out. Please try again.');
            }
        });
    }

    // Add click handlers to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            alert(`${cardTitle} feature coming soon!`);
        });
    });
});

