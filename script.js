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
        navbar.style.background = 'rgba(139, 90, 60, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 90, 60, 0.3)';
    } else {
        navbar.style.background = 'rgba(139, 90, 60, 0.9)';
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
            showElegantAlert('Please fill in all fields. ✨');
            return;
        }
        
        // Show success message
        showElegantAlert('Thank you for your message! I\'ll get back to you soon. 💫');
        contactForm.reset();
    });
}

// Elegant alert function
function showElegantAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'elegant-alert';
    alertBox.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">✨ OK</button>
        </div>
    `;
    
    alertBox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(139, 90, 60, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .elegant-alert .alert-content {
            background: linear-gradient(135deg, #f5f1eb, #e8ddd4);
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(139, 90, 60, 0.3);
            border: 2px solid #d4af37;
            max-width: 400px;
            animation: alertSlideIn 0.5s ease;
        }
        
        .elegant-alert p {
            color: #8b5a3c;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            font-weight: 500;
        }
        
        .elegant-alert button {
            background: linear-gradient(135deg, #8b5a3c, #d4af37);
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .elegant-alert button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(139, 90, 60, 0.4);
        }
        
        @keyframes alertSlideIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alertBox);
}

// Elegant typing animation for hero title
function elegantTypeWriter(element, text, speed = 80) {
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
        const nameSpan = heroTitle.querySelector('.elegant-text');
        const name = nameSpan ? nameSpan.textContent : 'Mounika Kallepalli';
        
        // Clear and set up for typing
        heroTitle.innerHTML = 'Hello, I\'m <span class="elegant-text"></span>';
        const elegantSpan = heroTitle.querySelector('.elegant-text');
        
        setTimeout(() => {
            elegantTypeWriter(elegantSpan, name, 60);
        }, 1000);
    }
});

// Elegant parallax effect for floating icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Sparkle animation
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.position = 'fixed';
    sparkle.style.width = Math.random() * 6 + 2 + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.background = 'linear-gradient(45deg, #d4af37, #ffd700)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.opacity = Math.random() * 0.8 + 0.2;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'sparkle 3s ease-in-out infinite';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Create sparkles periodically
setInterval(createSparkle, 2000);

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

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(139, 90, 60, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(139, 90, 60, 0.2)';
    });
});

// Elegant scroll progress indicator
function initScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    scrollProgress.style.position = 'fixed';
    scrollProgress.style.top = '0';
    scrollProgress.style.left = '0';
    scrollProgress.style.width = '0%';
    scrollProgress.style.height = '3px';
    scrollProgress.style.background = 'linear-gradient(45deg, #8b5a3c, #d4af37)';
    scrollProgress.style.zIndex = '9999';
    scrollProgress.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Elegant cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${6 - (index * 0.5)}px;
                height: ${6 - (index * 0.5)}px;
                background: radial-gradient(circle, #d4af37, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${point.x}px;
                top: ${point.y}px;
                opacity: ${(index + 1) / trailLength};
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.remove();
            }, 500);
        });
    });
}

// Initialize cursor trail
createeCursorTrail();

// Elegant section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.transition = 'all 0.8s ease';
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    entry.target.style.opacity = '0.8';
                    entry.target.style.transform = 'translateY(20px)';
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
}

// Initialize section transitions
initSectionTransitions();

// Add elegant loading screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'elegant-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-sparkle"></div>
            <p>Loading Portfolio...</p>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        #elegant-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f5f1eb, #e8ddd4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: #8b5a3c;
        }
        
        .loader-sparkle {
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #d4af37, #ffd700);
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: sparkleRotate 2s linear infinite;
        }
        
        .loader-content p {
            font-size: 1.2rem;
            font-weight: 500;
            margin-bottom: 20px;
        }
        
        .loader-bar {
            width: 200px;
            height: 4px;
            background: rgba(139, 90, 60, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .loader-progress {
            height: 100%;
            background: linear-gradient(45deg, #8b5a3c, #d4af37);
            width: 0%;
            animation: loadProgress 3s ease-in-out;
        }
        
        @keyframes sparkleRotate {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            to { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes loadProgress {
            to { width: 100%; }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loader after 3 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            loaderStyle.remove();
        }, 500);
    }, 3000);
}

// Show loading screen on page load
if (document.readyState === 'loading') {
    showLoadingScreen();
}

// Initialize all animations on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in class to elements
    const animatedElements = document.querySelectorAll('.section-title, .hero-description, .about-intro, .skill-category, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Add sparkle animation to CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
    `;
    document.head.appendChild(sparkleStyle);
});