// ===========================
// MOBILE MENU TOGGLE
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const submitBtn = document.querySelector('.btn-submit');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        
        try {
            const response = await fetch('https://formspree.io/f/mbdwzvaz', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                const data = await response.json();
                const errorMsg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Unknown error';
                formMessage.textContent = `Sorry, there was an error: ${errorMsg}. Please try again or email us directly at info@intellivation.io`;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        } catch (error) {
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly at info@intellivation.io';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// ===========================
// SMOOTH SCROLLING
// ===========================
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

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.project-card, .feature-card, .vm-card, .value-card, .service-card, .project-detail-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// FORM VALIDATION
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Optional field, but if provided should be valid
    if (!phone) return true;
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone);
}

// Real-time validation
if (contactForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// ===========================
// PAGE LOAD ANIMATION
// ===========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🚀 Intellivation Solutions', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cTransforming Business with AI Solutions', 'color: #14b8a6; font-size: 14px;');
console.log('%cVisit us at: intellivation.io', 'color: #64748b; font-size: 12px;');
