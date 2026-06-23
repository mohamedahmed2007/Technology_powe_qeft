// ==================== Initialize AOS Animation Library ====================
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
});

// ==================== DOM Elements ====================
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const navList = document.querySelector('.nav-list');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const backToTopBtn = document.getElementById('backToTop');
const inspectionForm = document.getElementById('inspectionForm');
const formSuccess = document.getElementById('formSuccess');
const statNumbers = document.querySelectorAll('.stat-number');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const faqQuestions = document.querySelectorAll('.faq-question');

// ==================== Dark Mode Toggle ====================
// Check local storage for dark mode preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ==================== Mobile Menu Toggle ====================
mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        // Update active class
        document.querySelector('.nav-link.active')?.classList.remove('active');
        link.classList.add('active');
    });
});

// ==================== Sticky Header Shadow on Scroll ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    // Back to Top Button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Active nav link based on scroll position (simple implementation)
    const scrollPos = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Back to Top smooth scroll
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== Stats Counter Animation ====================
const animateCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(animateCounter, {
    threshold: 0.5
});

statNumbers.forEach(number => {
    counterObserver.observe(number);
});

// ==================== Gallery Filter ====================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==================== Testimonials Slider ====================
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        currentTestimonial = idx;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 5000);

// ==================== FAQ Accordion ====================
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

        // Toggle clicked item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==================== Inspection Form Handling ====================
inspectionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple form validation (optional)
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const service = document.getElementById('serviceType').value;

    if (!name || !phone || !address || !service) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return;
    }

    // Simulate form submission (you can integrate with backend here)
    // For demo, hide form and show success message
    inspectionForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Optional: Reset form after 5 seconds (for demonstration)
    setTimeout(() => {
        inspectionForm.reset();
        inspectionForm.style.display = 'block';
        formSuccess.style.display = 'none';
    }, 6000);
});

// ==================== Smooth Scroll for Anchor Links (additional) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});