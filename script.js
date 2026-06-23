// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hide');
    setTimeout(() => preloader.style.display = 'none', 500);
});

// ===== DOM Elements =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// ===== Sticky Header =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// ===== Dark Mode =====
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark'));
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark');
}

// ===== Smooth Scroll for Back to Top =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const speed = 50;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 20);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Products Grid (Dynamic) =====
const products = [
    { name: 'كاميرات مراقبة', icon: 'fa-video', desc: 'داخلية، خارجية، IP، WiFi' },
    { name: 'أجهزة تسجيل DVR/NVR', icon: 'fa-hdd', desc: 'سعات تخزين متعددة' },
    { name: 'هاردات المراقبة', icon: 'fa-database', desc: 'حتى 4 تيرا بايت' },
    { name: 'كابلات الشبكات', icon: 'fa-network-wired', desc: 'Cat6 والألياف الضوئية' },
    { name: 'أجهزة البصمة', icon: 'fa-fingerprint', desc: 'للحضور والانصراف' },
    { name: 'راوترات وسويتشات', icon: 'fa-wifi', desc: 'أجهزة شبكات عالية الأداء' },
];

const productsGrid = document.getElementById('productsGrid');
if (productsGrid) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.innerHTML = `
            <div class="product-img"><i class="fas ${product.icon}"></i></div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.desc}</p>
            </div>
        `;
        productsGrid.appendChild(card);
        revealObserver.observe(card);
    });
}

// ===== Gallery Grid (Dynamic) =====
const galleryItems = [
    { category: 'cameras', icon: 'fa-store', title: 'تركيب كاميرات بالمحلات' },
    { category: 'cameras', icon: 'fa-home', title: 'تركيب كاميرات بالمنازل' },
    { category: 'control', icon: 'fa-desktop', title: 'غرف المراقبة' },
    { category: 'sound', icon: 'fa-mosque', title: 'أنظمة صوت المساجد' },
    { category: 'sound', icon: 'fa-volume-up', title: 'صوتيات المحلات' },
    { category: 'network', icon: 'fa-server', title: 'تمديد شبكات' },
    { category: 'cameras', icon: 'fa-building', title: 'كاميرات شركات' },
    { category: 'control', icon: 'fa-shield-alt', title: 'أنظمة تحكم' },
];

const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
    const renderGallery = (filter = 'all') => {
        galleryGrid.innerHTML = '';
        galleryItems.forEach(item => {
            if (filter === 'all' || item.category === filter) {
                const div = document.createElement('div');
                div.className = `gallery-item reveal ${item.category}`;
                div.innerHTML = `<div style="text-align:center"><i class="fas ${item.icon}"></i><small style="display:block;margin-top:0.5rem;color:var(--gray-600)">${item.title}</small></div>`;
                galleryGrid.appendChild(div);
                revealObserver.observe(div);
            }
        });
    };
    renderGallery();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
}

// ===== Testimonial Slider =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dots .dot');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
};

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
    });
});

// Auto rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) faqItem.classList.add('active');
    });
});

// ===== Form Submission (Demo) =====
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(quoteForm);
        // Simulate submission
        alert(`شكراً ${formData.get('name')}!\nتم استلام طلبك بنجاح. سنتواصل معك قريباً على الرقم ${formData.get('phone')}.`);
        quoteForm.reset();
    });
}

// ===== Close mobile menu on outside click =====
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

console.log('Technology Power - جميع الأنظمة تعمل بنجاح ✅');