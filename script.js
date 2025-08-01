// NAVBAR FUNCTIONALITY
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on navigation links
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// FLOATING ELEMENTS FOR ABOUT SECTION
function createFloatingElement() {
    const element = document.createElement('div');
    element.classList.add('float-item');
    
    // Random positioning and timing
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (8 + Math.random() * 8) + 's';
    
    // Random colors for F1 theme
    const colors = [
        'rgba(225, 6, 0, 0.8)',    // F1 Red
        'rgba(255, 255, 255, 0.8)', // White
        'rgba(102, 126, 234, 0.8)', // Blue
        'rgba(255, 215, 0, 0.8)'    // Gold
    ];
    element.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('floatingElements').appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 16000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 2000);

// SMOOTH SCROLLING FOR NAVIGATION
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

// ADD SOME INTERACTIVE HOVER EFFECTS
document.querySelectorAll('.champion-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// INITIALIZE FLOATING ELEMENTS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    // Create initial floating elements
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingElement, i * 1000);
    }
});

window.addEventListener('load', function() {
    const loader = document.getElementById('f1-loader');
    if (loader) loader.classList.add('hide');
});