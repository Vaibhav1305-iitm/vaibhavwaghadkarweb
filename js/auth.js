// Authentication functionality
import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('index.html')) {
        // User is signed in and on login page, redirect to home
        window.location.href = 'home.html';
    }
});

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginBtn = loginForm.querySelector('.login-btn');
            
            // Show loading state
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;
            
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Show success message
                showToast('Login successful! Redirecting...', 'success');
                
                // Redirect to home page after short delay
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
                
            } catch (error) {
                console.error('Login error:', error);
                let errorMessage = 'Login failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection.';
                        break;
                }
                
                showToast(errorMessage, 'error');
                
                // Reset button
                loginBtn.innerHTML = '<span>Login</span><i class="fas fa-arrow-right"></i>';
                loginBtn.disabled = false;
            }
        });
    }

    // Signup functionality
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const signupBtn = signupForm.querySelector('.login-btn');
            
            // Basic validation
            if (password.length < 6) {
                showToast('Password must be at least 6 characters long.', 'error');
                return;
            }
            
            // Show loading state
            signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            signupBtn.disabled = true;
            
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Update user profile with name
                await updateProfile(user, {
                    displayName: name
                });
                
                // Show success message
                showToast('Account created successfully! Redirecting...', 'success');
                
                // Redirect to home page after short delay
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
                
            } catch (error) {
                console.error('Signup error:', error);
                let errorMessage = 'Account creation failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'An account with this email already exists.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak. Please choose a stronger password.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection.';
                        break;
                }
                
                showToast(errorMessage, 'error');
                
                // Reset button
                signupBtn.innerHTML = '<span>Sign Up</span><i class="fas fa-user-plus"></i>';
                signupBtn.disabled = false;
            }
        });
    }
});

// Toast notification function (if not already defined in main.js)
if (typeof showToast === 'undefined') {
    window.showToast = function(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };
}

