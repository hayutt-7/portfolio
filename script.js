document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Hamburger animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (nav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                // Reset Hamburger
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Runs only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Form Submission (Demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '보내는 중...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                alert('메시지가 성공적으로 전송되었습니다! (데모)');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
