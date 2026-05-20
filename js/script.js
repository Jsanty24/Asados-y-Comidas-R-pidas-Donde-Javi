document.addEventListener('DOMContentLoaded', () => {

    // ==================== SLIDER ====================
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.hero-dots');
    const prevBtn = document.querySelector('.hero-control.prev');
    const nextBtn = document.querySelector('.hero-control.next');
    let currentSlide = 0;
    let slideInterval;

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { stopSlider(); prevSlide(); startSlider(); });
        nextBtn.addEventListener('click', () => { stopSlider(); nextSlide(); startSlider(); });
    }

    goToSlide(0);
    startSlider();

    // ==================== MOBILE MENU ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });

    // ==================== MENU TABS ====================
    const tabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            menuItems.forEach(item => {
                if (category === 'combos' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            if (category === 'combos') {
                menuItems.forEach(item => item.style.display = 'block');
            }
        });
    });

    // ==================== SURVEY FORM ====================
    const surveyForm = document.getElementById('survey-form');
    const surveySuccess = document.getElementById('survey-success');

    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('survey-name').value.trim();
        const email = document.getElementById('survey-email').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        const message = document.getElementById('survey-message').value.trim();
        const referral = document.querySelector('input[name="referral"]:checked');

        if (!name || !email || !rating || !message) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        const submitBtn = surveyForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            const { error } = await supabaseClient
                .from('encuestas')
                .insert([
                    {
                        nombre: name,
                        email: email,
                        calificacion: parseInt(rating.value),
                        mensaje: message,
                        referral: referral ? referral.value : null,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            surveyForm.reset();
            surveyForm.style.display = 'none';
            surveySuccess.classList.remove('hidden');
        } catch (err) {
            console.error('Error al enviar encuesta:', err);
            alert('Ocurrió un error al enviar la encuesta. Por favor intenta de nuevo.');

            surveyForm.style.display = 'none';
            surveySuccess.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Encuesta';
        }
    });

    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ==================== SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('.promo-card, .menu-item, .about-feature, .contact-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

});