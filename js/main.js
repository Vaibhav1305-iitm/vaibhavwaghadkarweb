// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
});

// Popup functionality
const loginBtn = document.getElementById('loginBtn');
const loginPopup = document.getElementById('loginPopup');
const closePopup = document.getElementById('closePopup');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const popupTitle = document.getElementById('popupTitle');
const popupSubtitle = document.getElementById('popupSubtitle');

// Open popup
loginBtn.addEventListener('click', () => {
    loginPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close popup
closePopup.addEventListener('click', () => {
    loginPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close popup when clicking outside
loginPopup.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
        loginPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Switch to signup form
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    popupTitle.textContent = 'Create Account';
    popupSubtitle.textContent = 'Join thousands of learners today';
});

// Switch to login form
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'flex';
    popupTitle.textContent = 'Welcome Back';
    popupSubtitle.textContent = 'Sign in to continue your learning journey';
});

// Enhanced scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating-shapes');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Card hover effects with 3D transform
document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) scale(1)';
    });
});

// Career card hover effects
document.querySelectorAll('.career-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Enhanced input focus effects
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.class-card, .career-card, .feature-item').forEach(el => {
    observer.observe(el);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginPopup.classList.contains('active')) {
        loginPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Loading animation for buttons
document.querySelectorAll('.submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) return;
        
        this.classList.add('loading');
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Dynamic background shapes animation
function animateShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomScale = 0.8 + Math.random() * 0.4;
        
        shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
    });
}

// Animate shapes every 10 seconds
setInterval(animateShapes, 10000);

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for background shapes
    const shapes = document.querySelector('.floating-shapes');
    if (shapes) {
        shapes.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Header background opacity based on scroll
    const header = document.querySelector('.header');
    if (header) {
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.background = `rgba(10, 10, 15, ${opacity})`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    .submit-btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

