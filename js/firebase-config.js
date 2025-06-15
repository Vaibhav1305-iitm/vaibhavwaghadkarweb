// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAktGHbEfYBx7kQ38ehn2ef43fLObrVOsM",
    authDomain: "mylearningauth.firebaseapp.com",
    projectId: "mylearningauth",
    storageBucket: "mylearningauth.firebasestorage.app",
    messagingSenderId: "458548585723",
    appId: "1:458548585723:web:c0d11dab56a13f155afc5e",
    measurementId: "G-BP6R7ZBYMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

