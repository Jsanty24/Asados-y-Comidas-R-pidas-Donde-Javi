document.addEventListener('DOMContentLoaded', () => {
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

    const tabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            menuItems.forEach(item => {
                if (category === 'picadas' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            if (category === 'picadas') {
                menuItems.forEach(item => item.style.display = 'block');
            }
        });
    });

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

    // ==================== ABOUT SLIDER ====================
    const aboutSlides = document.querySelectorAll('.about-slide');
    if (aboutSlides.length > 1) {
        let currentAbout = 0;
        setInterval(() => {
            aboutSlides.forEach(s => s.classList.remove('active'));
            currentAbout = (currentAbout + 1) % aboutSlides.length;
            aboutSlides[currentAbout].classList.add('active');
        }, 4000);
    }

    // ==================== FETCH COMMENTS ====================
    const commentsList = document.getElementById('comments-list');

    async function loadComments() {
        try {
            const { data, error } = await supabaseClient
                .from('encuestas')
                .select('nombre, calificacion, mensaje, created_at')
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;

            if (!data || data.length === 0) return;

            commentsList.innerHTML = '';

            data.forEach(comment => {
                const stars = '★'.repeat(comment.calificacion) + '☆'.repeat(5 - comment.calificacion);
                const date = comment.created_at
                    ? new Date(comment.created_at).toLocaleDateString('es-CO')
                    : '';

                const card = document.createElement('div');
                card.className = 'comment-card';
                card.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-name">${escapeHtml(comment.nombre)}</span>
                        <span class="comment-stars">${stars}</span>
                    </div>
                    <p class="comment-message">${escapeHtml(comment.mensaje)}</p>
                    <div class="comment-date">${date}</div>
                `;
                commentsList.appendChild(card);
            });
        } catch (err) {
            console.error('Error al cargar comentarios:', err);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadComments();

});