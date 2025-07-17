// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skill bar animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
            
            // Add animation classes
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe skill bars
document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// Observe elements for animations
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add slide animations to about section
document.querySelector('.about-text')?.classList.add('slide-in-left');
document.querySelector('.profile-card')?.classList.add('slide-in-right');

if (document.querySelector('.about-text')) {
    observer.observe(document.querySelector('.about-text'));
}
if (document.querySelector('.profile-card')) {
    observer.observe(document.querySelector('.profile-card'));
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Show success message (you can integrate with a real form service)
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Typing animation for hero title (fixed version)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Get just the text content, not the HTML
        const nameSpan = heroTitle.querySelector('.gradient-text');
        const name = nameSpan ? nameSpan.textContent : 'Mounika Kallepalli';
        const displayText = `Hi, I'm ${name}`;
        
        // Clear the element and set up for typing
        heroTitle.innerHTML = 'Hi, I\'m <span class="gradient-text"></span>';
        const gradientSpan = heroTitle.querySelector('.gradient-text');
        
        setTimeout(() => {
            typeWriter(gradientSpan, name, 50);
        }, 1000);
    }
});

// Parallax effect for floating icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.section-title, .hero-description, .about-intro');

revealElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Color splash animation
function createColorSplash() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const splash = document.createElement('div');
    
    splash.style.position = 'fixed';
    splash.style.width = Math.random() * 100 + 50 + 'px';
    splash.style.height = splash.style.width;
    splash.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
    splash.style.borderRadius = '50%';
    splash.style.opacity = '0.1';
    splash.style.pointerEvents = 'none';
    splash.style.zIndex = '-1';
    splash.style.left = Math.random() * window.innerWidth + 'px';
    splash.style.top = Math.random() * window.innerHeight + 'px';
    splash.style.animation = 'float 8s ease-in-out infinite';
    
    document.body.appendChild(splash);
    
    setTimeout(() => {
        splash.remove();
    }, 8000);
}

// Create random color splashes
setInterval(createColorSplash, 3000);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in class to elements
    const animatedElements = document.querySelectorAll('.section-title, .hero-description, .about-intro, .skill-category, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
});

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
// showPreloader();