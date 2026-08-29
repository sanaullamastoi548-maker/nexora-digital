/**
 * NOVA STUDIO - Interactive & Professional Main Script
 * Handles navigation, smooth scrolling, interactive cards, and UI animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. MOBILE MENU TOGGLE
    ===================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const isExpanded = navLinks.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking any navigation link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    /* =====================================================
       2. HEADER SCROLL EFFECT & ACTIVE LINK HIGHLIGHTER
    ===================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Add shadow/backdrop update to header on scroll
        if (header) {
            if (scrollY > 50) {
                header.style.background = 'rgba(5, 11, 20, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(5, 11, 20, 0.8)';
                header.style.boxShadow = 'none';
            }
        }

        // Active link highlighting based on current section
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    /* =====================================================
       3. SMOOTH SCROLLING FOR INTERNAL LINKS
    ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    /* =====================================================
       4. HERO CODE CARD TYPEWRITER EFFECT
    ===================================================== */
    const codeContainer = document.querySelector('.code-content pre code');
    if (codeContainer) {
        const originalText = codeContainer.innerText;
        codeContainer.innerText = '';
        let index = 0;

        const typeWriter = () => {
            if (index < originalText.length) {
                codeContainer.innerText += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 15); // Adjust typing speed here
            }
        };

        // Start typing effect slightly after page load
        setTimeout(typeWriter, 500);
    }

    /* =====================================================
       5. 3D TILT EFFECT FOR VISUAL CODE CARD
    ===================================================== */
    const codeCard = document.querySelector('.code-card');

    if (codeCard) {
        codeCard.addEventListener('mousemove', (e) => {
            const rect = codeCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / rect.height) * 20; // Maximum rotation angle
            const rotateY = (x / rect.width) * 20;

            codeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        codeCard.addEventListener('mouseleave', () => {
            codeCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    /* =====================================================
       6. REVEAL ELEMENTS ON SCROLL (INTERSECTION OBSERVER)
    ===================================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to cards and headings
    const animatedItems = document.querySelectorAll('.service-card, .project-card, .section-heading');
    animatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        revealObserver.observe(item);
    });
});
