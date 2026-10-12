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

const themeToggleBtn = document.getElementById('theme-toggle');

const setTheme = (theme) => {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('dark', !isLight);
    document.documentElement.classList.toggle('light', isLight);
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
            <span class="material-symbols-outlined text-base">${isLight ? 'light_mode' : 'dark_mode'}</span>
            ${isLight ? 'Light Mode' : 'Dark Mode'}
        `;
    }
    
    // Switch avatar images (hero section and resume avatar)
    const avatarSrc = isLight ? 'assets/images/Zeeshan-light.jpg' : 'assets/images/Zeeshan-dark.jpg';
    document.querySelectorAll('.theme-avatar-dynamic').forEach(img => {
        img.src = avatarSrc;
    });

    localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
    setTheme(savedTheme);
} else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
}

themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Ensure the initial active state is applied on page load or refresh.
window.dispatchEvent(new Event('scroll'));

// 5. Project filtering
function filterProjects(btn, category) {
    document.querySelectorAll('.filter-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#projects-grid article').forEach(card => {
        const isMatch = category === 'all' || card.dataset.category === category;
        card.style.opacity = isMatch ? '1' : '0.25';
        card.style.transform = isMatch ? 'scale(1)' : 'scale(0.97)';
        card.style.pointerEvents = isMatch ? 'auto' : 'none';
    });
}

// 6. Contact Form AJAX Submission with Vercel API / Environment Variable proxy
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusEl = document.getElementById('contact-status');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            submitBtn.innerHTML = `
                <span class="inline-block animate-spin mr-2">⟳</span>
                <span>Sending Message...</span>
            `;
        }

        if (statusEl) {
            statusEl.className = 'hidden';
            statusEl.innerHTML = '';
        }

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        let isSuccess = false;
        let errorMessage = '';

        // 1. First try the serverless API endpoint (Vercel or Netlify function)
        try {
            const apiRes = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (apiRes.ok) {
                isSuccess = true;
            }
        } catch (apiErr) {
            console.warn('/api/contact unreachable, falling back to direct Formspree...', apiErr);
        }

        // 2. Fallback to direct Formspree if /api/contact returned an error (e.g. Netlify static 400 or 404)
        if (!isSuccess) {
            try {
                const directEndpoint = (contactForm.action && contactForm.action.includes('formspree.io'))
                    ? contactForm.action
                    : 'https://formspree.io/f/xwvjbggz';

                const formspreeRes = await fetch(directEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (formspreeRes.ok) {
                    isSuccess = true;
                } else {
                    const data = await formspreeRes.json().catch(() => ({}));
                    if (data && data.errors && data.errors.length > 0) {
                        errorMessage = data.errors.map(err => err.message).join(', ');
                    } else if (data && data.error) {
                        errorMessage = data.error;
                    }
                }
            } catch (formspreeErr) {
                console.error('Direct Formspree error:', formspreeErr);
            }
        }

        if (isSuccess) {
            contactForm.reset();
            if (statusEl) {
                statusEl.className = 'p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-body-md block';
                statusEl.innerHTML = `
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
                        <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                    </div>
                `;
            }
        } else {
            if (statusEl) {
                statusEl.className = 'p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm font-body-md block';
                statusEl.innerHTML = `
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-rose-400 text-xl">error</span>
                        <span>${errorMessage || 'Could not send message automatically. Please reach out directly to <a href="mailto:zeeshanarshad854@gmail.com" class="underline text-primary font-bold">zeeshanarshad854@gmail.com</a>.'}</span>
                    </div>
                `;
            }
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            submitBtn.innerHTML = originalBtnHtml;
        }
    });
}

// 7. Project Details Modal Logic
const projectDetails = {
    "orbitinq": {
        title: "OrbitINQ AI",
        subtitle: "Inquiry & Order Automation • In Development",
        image: "assets/images/OrbitINQ.png",
        pills: ["Node.js", "Next.js", "Express", "PostgreSQL", "Prisma", "BullMQ", "WhatsApp API", "AI Knowledge Base"],
        description: "A multi-tenant inquiry and order automation platform unifying WhatsApp Cloud API, Gmail, and web inquiries into one automated pipeline, replying to product, pricing, and stock questions instantly using a custom company AI knowledge base.",
        highlights: [
            "Unified WhatsApp Cloud API, Gmail, and web-form inquiries into a single automated pipeline, providing instant answers to price and stock questions directly from a centralized knowledge base.",
            "Designed an automated order-booking flow with customizable message templates, handling Cash on Delivery separately alongside automated bank transfer receipt verification audits (account title, amount, and a 48-hour freshness window).",
            "Structured as a multi-tenant monorepo architecture: Express API, Next.js dashboard, BullMQ background queues, and PostgreSQL database via Prisma.",
            "Includes an interactive onboarding setup wizard with a live AI simulator, real-time order tracking, lead pipeline stages, and automated follow-up reminders."
        ],
        actions: `
            <span class="btn-ghost justify-center py-2.5 px-4 text-sm cursor-default opacity-80">
                <span class="material-symbols-outlined text-base">lock</span> Private Repository
            </span>
            <a href="#contact" onclick="closeProjectModal()" class="btn-primary justify-center py-2.5 px-4 text-sm">
                <span class="material-symbols-outlined text-base">mail</span> Discuss on Request
            </a>
        `
    },
    "amazon-repricer": {
        title: "Amazon Repricer",
        subtitle: "Pricing Automation Engine & Desktop App • Personal Project",
        image: "assets/images/Amazon%20Repricer.png",
        pills: ["Python", "Selenium", "Electron", "Node.js", "Vite", "Google Sheets API", "Paddle Billing"],
        description: "A dual-part pricing automation engine and standalone Windows desktop application suite designed to protect profit margins, monitor competitor quantity breaks, and automatically execute verified repricing actions in Amazon Seller Central.",
        highlights: [
            "Built a Python bot that reads a Google Sheets worklist, collects Amazon Business pricing and quantity-break data, and uses sheet formulas to judge profitability (ROI) before determining price actions.",
            "Automated verified price updates in Amazon Seller Central with Selenium and custom Chrome extensions, protected by a dry-run mode, comprehensive audit logging, and a save-and-read-back check before any live change.",
            "Packaged the engine into a Windows desktop application with Electron, allowing users to run it seamlessly without installing Python or needing access to source code.",
            "Designed a 15-screen setup and monitoring interface covering Google Sheets, Amazon Business and Seller Central setup, live run monitoring, run history, and diagnostics.",
            "Engineered and deployed the product's marketing and checkout website with Paddle billing across subscription tiers, plus pricing, support, and legal pages."
        ],
        actions: `
            <a href="https://amazonrepricer.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn-primary justify-center py-2.5 px-4 text-sm">
                <span class="material-symbols-outlined text-base">rocket_launch</span> Visit Website
            </a>
            <a href="https://github.com/zeeshan8540/amazon_repricer_releases/releases" target="_blank" rel="noopener noreferrer" class="btn-ghost justify-center py-2.5 px-4 text-sm">
                <span class="material-symbols-outlined text-base">download</span> Download Desktop App
            </a>
        `
    },
    "travel-wise": {
        title: "Travel Wise",
        subtitle: "Tourism Planning Mobile App • Final Year Project",
        image: "assets/images/Travel%20Wise.jpg",
        imageClass: "object-[center_28%]",
        pills: ["Flutter", "Dart", "Firebase", "Firestore", "Google Maps API", "Mobile UX"],
        description: "A cross-platform mobile application developed with Flutter and Firebase designed for comprehensive tourism planning, collaborative trip itineraries, and location-based exploration.",
        highlights: [
            "Co-developed a cross-platform tourism planning app with Flutter and Firebase in a two-person team, covering authentication, real-time data synchronization, and location-based features.",
            "Handled end-to-end debugging of application issues, accurately diagnosing and separating backend/database failures from device and network problems.",
            "Architected responsive mobile UI components with offline caching and state management for an effortless trip planning experience across Android and iOS devices."
        ],
        actions: `
            <span class="btn-ghost justify-center py-2.5 px-4 text-sm cursor-default opacity-80">
                <span class="material-symbols-outlined text-base">school</span> Academic Final Year Project (Private)
            </span>
        `
    },
    "portfolio": {
        title: "Personal Portfolio",
        subtitle: "Modern Responsive Web Portfolio • Personal Project",
        image: "assets/images/Portfolio.png",
        pills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Netlify", "Canvas API"],
        description: "A bespoke, high-performance developer portfolio website engineered to present software projects, technical background, and interactive design systems with dark/light mode synchronization.",
        highlights: [
            "Designed and implemented a responsive, accessible interface with custom CSS design tokens, dynamic dark/light theme switching with instant asset switching, and interactive canvas starfield effects.",
            "Built with semantic HTML structure, responsive fluid layouts, and accessible UI components with subtle micro-animations.",
            "Hosted and continuously deployed via Netlify with git-integrated build workflows and optimized asset delivery."
        ],
        actions: `
            <a href="https://zeeshanarshad.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn-primary justify-center py-2.5 px-4 text-sm">
                <span class="material-symbols-outlined text-base">rocket_launch</span> Live Website
            </a>
            <a href="https://github.com/zeeshan8540/my_portfolio" target="_blank" rel="noopener noreferrer" class="btn-ghost justify-center py-2.5 px-4 text-sm">
                <span class="material-symbols-outlined text-base">code</span> GitHub Repository
            </a>
        `
    }
};

const modalBackdrop = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalBackdrop) return;

    const imgEl = document.getElementById('modal-img');
    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const pillsEl = document.getElementById('modal-pills');
    const descEl = document.getElementById('modal-description');
    const highlightsEl = document.getElementById('modal-highlights');
    const actionsEl = document.getElementById('modal-actions');

    if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
        imgEl.className = `w-full h-full object-cover block ${data.imageClass || 'object-top'}`;
    }
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (descEl) descEl.textContent = data.description;

    if (pillsEl) {
        pillsEl.innerHTML = data.pills.map(p => `<span class="skill-pill">${p}</span>`).join('');
    }

    if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    }

    if (actionsEl) {
        actionsEl.innerHTML = data.actions;
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeProjectModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
        closeProjectModal();
    }
});

