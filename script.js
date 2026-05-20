// Tailwind Configuration for CDN
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "tertiary-fixed-dim": "#ffb786",
              "primary-fixed": "#d8e2ff",
              "on-secondary-container": "#aeb9d0",
              "tertiary-fixed": "#ffdcc6",
              "primary-container": "#4d8eff",
              "on-tertiary-fixed": "#311400",
              "surface-dim": "#0b1326",
              "primary": "#adc6ff",
              "on-surface": "#dae2fd",
              "on-tertiary-fixed-variant": "#723600",
              "on-primary-fixed": "#001a42",
              "inverse-on-surface": "#283044",
              "secondary-fixed-dim": "#bcc7de",
              "secondary-fixed": "#d8e3fb",
              "surface-container-highest": "#2d3449",
              "surface-tint": "#adc6ff",
              "on-error": "#690005",
              "surface-container-low": "#131b2e",
              "outline": "#8c909f",
              "on-secondary": "#263143",
              "on-primary-fixed-variant": "#004395",
              "on-error-container": "#ffdad6",
              "surface-container-lowest": "#060e20",
              "secondary-container": "#3e495d",
              "background": "#0b1326",
              "on-primary": "#002e6a",
              "surface-variant": "#2d3449",
              "on-background": "#dae2fd",
              "on-primary-container": "#00285d",
              "surface": "#0b1326",
              "tertiary": "#ffb786",
              "on-secondary-fixed-variant": "#3c475a",
              "surface-bright": "#31394d",
              "tertiary-container": "#df7412",
              "error-container": "#93000a",
              "on-secondary-fixed": "#111c2d",
              "primary-fixed-dim": "#adc6ff",
              "outline-variant": "#424754",
              "on-tertiary": "#502400",
              "on-tertiary-container": "#461f00",
              "surface-container-high": "#222a3d",
              "error": "#ffb4ab",
              "inverse-primary": "#005ac2",
              "surface-container": "#171f33",
              "inverse-surface": "#dae2fd",
              "on-surface-variant": "#c2c6d6",
              "secondary": "#bcc7de"
      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
      },
      "spacing": {
              "container-max": "1200px",
              "margin-mobile": "16px",
              "gutter": "24px",
              "section-gap": "120px",
              "unit": "4px"
      },
      "fontFamily": {
              "headline-lg-mobile": ["Inter"],
              "caption": ["Inter"],
              "body-md": ["Inter"],
              "display": ["Inter"],
              "label-mono": ["JetBrains Mono"],
              "headline-md": ["Inter"],
              "headline-lg": ["Inter"],
              "body-lg": ["Inter"]
      },
      "fontSize": {
              "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "700"}],
              "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
              "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
              "label-mono": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
              "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
              "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
              "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
      }
    },
  },
};

// 1. Star Field Background Effect
const canvas = document.getElementById('star-field');
if (canvas && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const count = 100;

    const initCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                opacity: Math.random(),
                speed: Math.random() * 0.05 + 0.02
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(173, 198, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            star.y -= star.speed;
            if (star.y < 0) star.y = canvas.height;
            star.opacity = Math.sin(Date.now() * 0.001 * star.speed * 50) * 0.5 + 0.5;
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();
    draw();
}

// 2. Typing Effect for Hero
const words = ["Digital Solutions", "Robust Architectures", "Modern Interfaces", "Scalable Systems"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function type() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    const displayWord = isDeleting 
        ? currentWord.substring(0, charIndex--) 
        : currentWord.substring(0, charIndex++);

    typingElement.textContent = displayWord;

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    setTimeout(type, 1000);
}

// 3. Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate skill bars specifically
            const bars = entry.target.querySelectorAll('.progress-bar-fill');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            
            // Optional: Unobserve if you only want it to fire once
            // revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 4. Update active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const header = document.querySelector('header');

const updateActiveNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        if (!sectionId) return;
        if (window.pageYOffset >= sectionTop - 160) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === `#${current}`;

        link.classList.toggle('text-primary', isActive);
        link.classList.toggle('font-bold', isActive);
        link.classList.toggle('border-b-2', isActive);
        link.classList.toggle('border-primary', isActive);
        link.classList.toggle('pb-1', isActive);
        link.classList.toggle('text-on-surface-variant', !isActive);
        link.classList.toggle('active', isActive);
    });

    // Header shadow
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    }
};

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Ensure the initial active state is applied on page load or refresh.
window.dispatchEvent(new Event('scroll'));

// 5. Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Sending...';
        setTimeout(() => {
            btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Sent!';
            e.target.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
