// Add scroll animation trigger
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .why-card').forEach(card => {
            observer.observe(card);
        });

        // Smooth parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add click animation to CTA button
        document.querySelector('.cta-button').addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            const button = this.querySelector('.submit-button');
            button.textContent = 'Sending...';
            button.disabled = true;
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const contactHeader = document.getElementById('contactHeader');

        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            contactHeader.classList.toggle('active');
        });

        // Testimonials carousel
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');
        let currentIndex = 0;

        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            testimonialCards.forEach((card, index) => {
                card.classList.remove('active', 'prev');
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index < currentIndex) {
                    card.classList.add('prev');
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-advance carousel
        setInterval(nextSlide, 5000);