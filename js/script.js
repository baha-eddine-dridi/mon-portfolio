// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== SKILLS SLIDER =====
let currentSkillSlide = 0;
const skillsSlider = document.getElementById('skills-slider');
const skillsDots = document.querySelectorAll('.skills-dots .dot');
const skillsSlides = document.querySelectorAll('.skills-slide');

function showSkillSlide(index) {
    if (!skillsSlider || !skillsSlides.length) return;
    
    // Update slides
    skillsSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    skillsDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
    
    // Transform slider
    skillsSlider.style.transform = `translateX(-${index * 100}%)`;
    
    // Animate skill bars for current slide
    setTimeout(() => {
        animateSkillBars(skillsSlides[index]);
    }, 300);
}

function nextSkillSlide() {
    currentSkillSlide = (currentSkillSlide + 1) % skillsSlides.length;
    showSkillSlide(currentSkillSlide);
}

function prevSkillSlide() {
    currentSkillSlide = (currentSkillSlide - 1 + skillsSlides.length) % skillsSlides.length;
    showSkillSlide(currentSkillSlide);
}

function animateSkillBars(slide) {
    const skillBars = slide.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// ===== PROJECT IMAGE CAROUSEL =====
window.changeImage = function(btn, direction) {
    const carousel = btn.closest('.project-image-carousel');
    const images = carousel.querySelectorAll('.project-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const currentActive = carousel.querySelector('.project-image.active');
    const currentDotActive = carousel.querySelector('.carousel-dot.active');
    
    let currentIndex = Array.from(images).indexOf(currentActive);
    let newIndex = currentIndex + direction;
    
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;
    
    // Update images
    images[currentIndex].classList.remove('active');
    images[newIndex].classList.add('active');
    
    // Update dots
    if (currentDotActive) currentDotActive.classList.remove('active');
    if (dots[newIndex]) dots[newIndex].classList.add('active');
}

window.currentImage = function(dot, index) {
    const carousel = dot.closest('.project-image-carousel');
    const images = carousel.querySelectorAll('.project-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const currentActive = carousel.querySelector('.project-image.active');
    const currentDotActive = carousel.querySelector('.carousel-dot.active');
    
    const newIndex = index - 1; // Convert to 0-based index
    const currentIndex = Array.from(images).indexOf(currentActive);
    
    if (newIndex !== currentIndex) {
        // Update images
        images[currentIndex].classList.remove('active');
        images[newIndex].classList.add('active');
        
        // Update dots
        if (currentDotActive) currentDotActive.classList.remove('active');
        if (dots[newIndex]) dots[newIndex].classList.add('active');
    }
}

// ===== EFFET DE TYPING =====
const typingTexts = [
    "Développeur Web",
    "Software Engineering Student", 
    "Full Stack Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
        console.error('Element typing-text not found');
        return;
    }
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}

// Démarrer l'effet de typing
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting typing effect...');
    
    // Initialize theme
    initTheme();
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Skills slider navigation
    const skillsPrevBtn = document.getElementById('skills-prev');
    const skillsNextBtn = document.getElementById('skills-next');
    
    if (skillsPrevBtn) {
        skillsPrevBtn.addEventListener('click', prevSkillSlide);
    }
    
    if (skillsNextBtn) {
        skillsNextBtn.addEventListener('click', nextSkillSlide);
    }
    
    // Skills dots navigation
    skillsDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSkillSlide = index;
            showSkillSlide(currentSkillSlide);
        });
    });
    
    // Initialize first skill slide
    if (skillsSlides.length > 0) {
        showSkillSlide(0);
    }
    
    // Auto-rotation disabled per user request
    // setInterval(() => {
    //     if (skillsSlides.length > 0) {
    //         nextSkillSlide();
    //     }
    // }, 5000);
    
    // Attendre que l'élément soit complètement rendu
    setTimeout(() => {
        const element = document.getElementById('typing-text');
        if (element) {
            console.log('Found typing element, starting animation');
            typeWriter();
        } else {
            console.error('typing-text element not found');
        }
    }, 500);
});

// ===== NAVIGATION =====
// Gestion du menu mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Effet de scroll sur la navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Navigation active selon la section
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== ANIMATIONS AU SCROLL =====
// Observer pour les animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Ajouter les classes d'animation aux éléments
document.addEventListener('DOMContentLoaded', () => {
    // Éléments à animer
    const animateElements = document.querySelectorAll(`
        .hero-text,
        .hero-image,
        .about-text,
        .about-stats,
        .skills-category,
        .project-card,
        .timeline-item,
        .contact-info,
        .contact-form
    `);
    
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        observer.observe(element);
        
        // Délai progressif pour les cartes de projets
        if (element.classList.contains('project-card')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        }
    });
});

// ===== BARRES DE COMPÉTENCES =====
const skillsSection = document.getElementById('competences');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Animation des barres de compétences améliorée
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animation en cascade avec délai
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.classList.add('animate');
                    
                    // Animation de brillance
                    setTimeout(() => {
                        progressBar.style.animation = 'progressGlow 1.5s ease-out';
                    }, 800);
                }, Math.random() * 500); // Délai aléatoire pour effet cascade
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Animation des cartes de compétences
function animateSkillCards() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = `fadeInScale 0.6s ease-out ${index * 0.1}s both`;
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
}

// Animation des catégories de compétences
function animateSkillCategories() {
    const categories = document.querySelectorAll('.skills-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = `slideInUp 0.8s ease-out both`;
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    categories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        observer.observe(category);
    });
}

// Initialiser les animations des compétences
function initSkillAnimations() {
    animateSkills();
    animateSkillCards();
    animateSkillCategories();
}

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    showNotification('Message envoyé avec succès !', 'success');
    contactForm.reset();
});

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Ajouter les styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gérer la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Fermeture automatique après 5 secondes
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Compensation pour la navbar fixe
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ANIMATIONS DES COMPÉTENCES =====
// Animation des barres de compétences améliorée
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animation en cascade avec délai
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.classList.add('animate');
                    
                    // Animation de brillance
                    setTimeout(() => {
                        progressBar.style.animation = 'progressGlow 1.5s ease-out';
                    }, 800);
                }, Math.random() * 500); // Délai aléatoire pour effet cascade
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Animation des cartes de compétences
function animateSkillCards() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = `fadeInScale 0.6s ease-out ${index * 0.1}s both`;
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
}

// Animation des catégories de compétences
function animateSkillCategories() {
    const categories = document.querySelectorAll('.skills-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = `slideInUp 0.8s ease-out both`;
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    categories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        observer.observe(category);
    });
}

// Initialiser les animations des compétences
function initSkillAnimations() {
    animateSkills();
    animateSkillCards();
    animateSkillCategories();
}

// ===== DARK MODE (OPTIONNEL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Vérifier la préférence sauvegardée
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Initialiser les animations des compétences
    initSkillAnimations();
});

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== SCROLL TO TOP =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class=\"fas fa-arrow-up\"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PRELOADER (OPTIONNEL) =====
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">BD</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: all 0.5s ease;
    `;
    
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

// Activer le preloader si souhaité
// createPreloader();

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function pour optimiser les événements de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimiser les événements de scroll
const optimizedScrollHandler = throttle(() => {
    // Code d'optimisation si nécessaire
}, 100);

// ===== VIDEO MODAL =====
function openVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById(videoId);
    
    if (modal && video) {
        // Cacher toutes les vidéos d'abord
        const allVideos = modal.querySelectorAll('video');
        allVideos.forEach(v => {
            v.style.display = 'none';
            v.pause();
            v.currentTime = 0;
        });
        
        // Afficher uniquement la vidéo demandée
        video.style.display = 'block';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
        
        // Attendre que le modal soit visible avant de lancer la vidéo
        setTimeout(() => {
            video.play().catch(error => {
                console.log('Autoplay prevented:', error);
                // L'utilisateur devra cliquer sur play manuellement
            });
        }, 100);
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    
    if (modal) {
        // Pause toutes les vidéos
        const allVideos = modal.querySelectorAll('video');
        allVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
            video.currentTime = 0; // Réinitialiser la vidéo
            video.style.display = 'none'; // Cacher la vidéo
        });
        
        // Ensuite ferme le modal
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll
        }, 50);
    }
}

// Fermer le modal en cliquant en dehors de la vidéo
document.addEventListener('click', function(event) {
    const modal = document.getElementById('video-modal');
    if (event.target === modal) {
        closeVideoModal();
    }
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});