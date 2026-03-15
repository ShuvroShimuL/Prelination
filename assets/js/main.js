/**
 * PreliNation Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navWrapper.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu if open
                if (navWrapper && navWrapper.classList.contains('active')) {
                    navWrapper.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Scroll to element with an offset for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString();
                    // Add '+' sign if it's not the success rate
                    if (target > 100) {
                        counter.innerText += '+';
                    } else {
                        counter.innerText += '%';
                    }
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Stats Section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !counted) {
                runCounters();
                counted = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // 4. Testimonials Slider
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.ts-prev');
    const nextBtn = document.querySelector('.ts-next');

    if (track && slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateSliderPosition = () => {
            const width = slides[0].clientWidth;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
        };

        const goToNextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        };

        const goToPrevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        };

        nextBtn.addEventListener('click', goToNextSlide);
        prevBtn.addEventListener('click', goToPrevSlide);

        // Optional: Auto-play functionality
        let sliderInterval = setInterval(goToNextSlide, 6000);

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        track.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(goToNextSlide, 6000);
        });

        // Handle resize window to adjust translation
        window.addEventListener('resize', updateSliderPosition);
    }

    // 5. Update Footer Year Dynamically
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 6. Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-menu ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
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

    // 7. Notice Ticker Animation
    const noticeTicker = document.querySelector('.notice-ticker');
    if (noticeTicker) {
        let position = 0;
        let animationFrameId;

        const animateTicker = () => {
            position -= 1;
            if (position < -noticeTicker.scrollWidth / 2) {
                position = 0; // Reset smoothly
            }
            noticeTicker.style.transform = `translateX(${position}px)`;
            animationFrameId = requestAnimationFrame(animateTicker);
        };
        animationFrameId = requestAnimationFrame(animateTicker);
        
        // Pause on hover
        noticeTicker.addEventListener('mouseenter', () => cancelAnimationFrame(animationFrameId));
        noticeTicker.addEventListener('mouseleave', () => {
            animationFrameId = requestAnimationFrame(animateTicker);
        });
    }

    // 8. Gallery Slider
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
        // Simple auto-scroll for gallery
        let galleryPos = 0;
        let galleryAnimationId;
        
        const animateGallery = () => {
            galleryPos -= 0.5;
            if (galleryPos < -(galleryTrack.scrollWidth / 2)) {
                galleryPos = 0;
            }
            galleryTrack.style.transform = `translateX(${galleryPos}px)`;
            galleryAnimationId = requestAnimationFrame(animateGallery);
        };
        galleryAnimationId = requestAnimationFrame(animateGallery);

        galleryTrack.addEventListener('mouseenter', () => cancelAnimationFrame(galleryAnimationId));
        galleryTrack.addEventListener('mouseleave', () => {
            galleryAnimationId = requestAnimationFrame(animateGallery);
        });
    }

});
