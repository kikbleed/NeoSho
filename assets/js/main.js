/**
 * Neosho Security Solutions - Shared JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Navigation
  initNavigation();

  // 2. Initialize Theme Mode
  initThemeMode();

  // 3. Initialize pinned video scroll scrub hero
  initPinnedVideoScrubHero();

  // 4. Initialize Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 4. Initialize GSAP Animations
  initAnimations();

  // 5. Initialize Contact Form Validation (if on contact page)
  initContactForm();
});

/**
 * Navigation handler for mobile menu and active page highlighting
 */
function initNavigation() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    if (!menu) return;
    menu.classList.add('open');
    if (menuIcon) menuIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('open');
    if (menuIcon) menuIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  if (btn && menu) {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (!menu.classList.contains('open')) return;
      if (menu.contains(event.target) || btn.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname;
  let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (!currentPage || currentPage === '/') {
    currentPage = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  const allMobileLinks = document.querySelectorAll('.mobile-link');

  const checkLinkActive = (hrefAttr, pageName) => {
    // Exact file matching or index.html fallback for root path
    if (hrefAttr === pageName) return true;
    if (pageName === 'index.html' && (hrefAttr === './' || hrefAttr === '/')) return true;
    return false;
  };

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive = checkLinkActive(href, currentPage);

    link.classList.toggle('text-black', isActive);
    link.classList.toggle('text-gray-500', !isActive);
    link.classList.toggle('after:w-full', isActive);
    link.classList.toggle('after:bg-black', isActive);
    link.classList.toggle('after:w-0', !isActive);
    link.classList.toggle('after:bg-transparent', !isActive);
  });

  allMobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive = checkLinkActive(href, currentPage);

    link.classList.toggle('text-black', isActive);
    link.classList.toggle('text-gray-500', !isActive);
  });
}


/**
 * Dark theme toggle. The default remains the original light theme.
 * A saved preference is remembered on the device.
 */
function initThemeMode() {
  const root = document.documentElement;
  const buttons = [];

  const getStoredTheme = () => {
    try {
      return localStorage.getItem('neosho-theme');
    } catch (error) {
      return null;
    }
  };

  const setStoredTheme = (theme) => {
    try {
      localStorage.setItem('neosho-theme', theme);
    } catch (error) {}
  };

  const isDark = () => root.getAttribute('data-theme') === 'dark';

  const updateLogoAssets = () => {
    const dark = isDark();
    document.querySelectorAll('.site-logo-img, .footer-logo-img').forEach((img) => {
      const currentSrc = img.getAttribute('src') || '';
      if (!img.dataset.lightSrc) {
        img.dataset.lightSrc = currentSrc;
      }
      if (!img.dataset.darkSrc) {
        img.dataset.darkSrc = img.dataset.lightSrc.replace(/\.png$/i, '-dark.png');
      }
      img.setAttribute('src', dark ? img.dataset.darkSrc : img.dataset.lightSrc);
    });
  };

  const updateButtons = () => {
    buttons.forEach((button) => {
      const dark = isDark();
      const text = button.querySelector('.theme-toggle-text');
      const label = dark ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', label);
      if (text) text.textContent = label;
    });
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    setStoredTheme(theme === 'dark' ? 'dark' : 'light');
    updateLogoAssets();
    updateButtons();

    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('neosho-theme-change', { detail: { theme } }));
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh(true);
      }
    });
  };

  const createButton = (mobile = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = mobile ? 'theme-toggle theme-toggle-mobile' : 'theme-toggle';
    button.innerHTML = `
      <span class="theme-toggle-icon" aria-hidden="true">
        <svg class="night-mode-icon" viewBox="0 0 64 64" focusable="false">
          <g class="theme-icon-rays" stroke="currentColor" stroke-width="6" stroke-linecap="round">
            <path d="M32 5v8"></path>
            <path d="M32 51v8"></path>
            <path d="M5 32h8"></path>
            <path d="M51 32h8"></path>
            <path d="M13 13l6 6"></path>
            <path d="M45 45l6 6"></path>
            <path d="M51 13l-6 6"></path>
            <path d="M19 45l-6 6"></path>
          </g>
          <circle class="theme-icon-core" cx="32" cy="32" r="18" fill="currentColor"></circle>
          <path class="theme-icon-crescent" d="M42.5 45.8A18.5 18.5 0 0 1 26.8 14.4A19.4 19.4 0 1 0 49.4 38.8A18.4 18.4 0 0 1 42.5 45.8Z" fill="var(--theme-icon-cutout, #fff)"></path>
        </svg>
      </span>
      <span class="theme-toggle-text">Dark mode</span>
    `;
    button.addEventListener('click', () => applyTheme(isDark() ? 'light' : 'dark'));
    buttons.push(button);
    return button;
  };

  const desktopActions = document.querySelector('nav .nav-desktop.z-10');
  if (desktopActions && !desktopActions.querySelector('.theme-toggle')) {
    desktopActions.insertBefore(createButton(false), desktopActions.firstChild);
  }

  const mobileActions = document.querySelector('#mobile-menu .flex.flex-col.gap-3.mt-8');
  if (mobileActions && !mobileActions.querySelector('.theme-toggle')) {
    mobileActions.insertBefore(createButton(true), mobileActions.firstChild);
  }

  const storedTheme = getStoredTheme();
  if (storedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }

  updateLogoAssets();
  updateButtons();
}


/**
 * Pinned YouTube scroll-scrub hero.
 * This uses the YouTube IFrame API as a preview. For the final production
 * version, an MP4 will scrub more smoothly and accurately frame-by-frame.
 */
function initPinnedVideoScrubHero() {
  const hero = document.querySelector('.scroll-video-hero[data-youtube-id]');
  if (!hero) return;

  const section = hero.closest('.scroll-video-section') || hero;
  const iframe = document.getElementById('scroll-scrub-youtube-frame');
  const steps = Array.from(hero.querySelectorAll('.scroll-video-step'));
  const progressBar = hero.querySelector('.scroll-video-progress span');
  const isMobile = () => window.matchMedia('(max-width: 1023px)').matches;

  const scrubStart = Number(hero.dataset.youtubeStart || 0);
  let scrubEnd = Number(hero.dataset.youtubeEnd || 24);

  let player = null;
  let playerReady = false;
  let targetTime = scrubStart;
  let lastSeekTime = 0;
  let ticking = false;

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

  const setActiveStep = (progress) => {
    if (!steps.length) return;
    const index = Math.min(steps.length - 1, Math.floor(clamp(progress) * steps.length));
    steps.forEach((step, stepIndex) => {
      step.classList.toggle('is-active', stepIndex === index);
    });
  };

  const setProgress = (progress) => {
    const safeProgress = clamp(progress);
    if (progressBar) progressBar.style.width = `${safeProgress * 100}%`;
    setActiveStep(safeProgress);
  };

  const markVideoVisible = () => {
    hero.classList.remove('video-loading', 'video-fallback');
    hero.classList.add('video-loaded');
  };

  const updateProgressFromScroll = () => {
    ticking = false;

    if (isMobile()) {
      hero.classList.remove('video-loading');
      hero.classList.add('video-fallback');
      setProgress(0);
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const totalScrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-sectionRect.top / totalScrollable);
    targetTime = scrubStart + (scrubEnd - scrubStart) * progress;
    setProgress(progress);

    if (playerReady && player && typeof player.seekTo === 'function') {
      const now = performance.now();
      // YouTube cannot reliably handle true frame-by-frame seeking. This throttle keeps the preview stable.
      if (now - lastSeekTime > 160) {
        try {
          player.seekTo(targetTime, true);
          if (typeof player.playVideo === 'function') player.playVideo();
        } catch (error) {}
        lastSeekTime = now;
      }
    }
  };

  const requestProgressUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgressFromScroll);
  };

  if (iframe) {
    iframe.addEventListener('load', markVideoVisible, { once: true });

    // Load the YouTube iframe after the load listener is attached so the video cannot be hidden accidentally.
    if (!isMobile() && !iframe.dataset.srcPrepared) {
      try {
        const rawSrc = iframe.dataset.youtubeSrc || iframe.getAttribute('src');
        if (rawSrc) {
          const url = new URL(rawSrc);
          url.searchParams.set('origin', window.location.origin);
          iframe.src = url.toString();
        }
      } catch (error) {}
      iframe.dataset.srcPrepared = 'true';
    }

    // Keep the fallback image if YouTube is blocked or slow.
    window.setTimeout(() => {
      if (!hero.classList.contains('video-loaded')) {
        hero.classList.remove('video-loading');
        hero.classList.add('video-fallback');
      }
    }, 4500);
  }

  const initPlayer = () => {
    if (!iframe || player || !window.YT || typeof window.YT.Player !== 'function') return;
    try {
      player = new window.YT.Player(iframe, {
        events: {
          onReady: (event) => {
            playerReady = true;
            markVideoVisible();
            try {
              event.target.mute();
              event.target.playVideo();
              const duration = event.target.getDuration();
              if (duration && duration > scrubStart) scrubEnd = Math.min(scrubEnd, duration);
              event.target.seekTo(targetTime, true);
            } catch (error) {}
            requestProgressUpdate();
          },
          onError: () => {
            hero.classList.remove('video-loading');
            hero.classList.add('video-fallback');
          }
        }
      });
    } catch (error) {
      // The plain iframe still plays even if the API fails.
      markVideoVisible();
    }
  };

  if (!isMobile()) {
    const previousYouTubeReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousYouTubeReady === 'function') {
        try { previousYouTubeReady(); } catch (error) {}
      }
      initPlayer();
    };

    if (window.YT && typeof window.YT.Player === 'function') {
      initPlayer();
    } else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  } else {
    hero.classList.remove('video-loading');
    hero.classList.add('video-fallback');
  }

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate, { passive: true });
  window.addEventListener('orientationchange', requestProgressUpdate, { passive: true });
  window.addEventListener('neosho-theme-change', () => {
    // Theme changes should never destroy or re-pin the hero.
    requestProgressUpdate();
  });

  requestProgressUpdate();
}

/**
 * GSAP Scroll Animations
 */
function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Text Reveal Setup (Masked Staggered Words)
  const titles = document.querySelectorAll('.animate-title');
  titles.forEach(title => {
    // Avoid double splitting
    if (title.querySelector('.reveal-word')) return;

    const words = title.innerText.split(' ');
    title.innerHTML = '';

    words.forEach((word, index) => {
      const wordContainer = document.createElement('span');
      wordContainer.className = 'reveal-word';

      if (index < words.length - 1) {
        wordContainer.style.marginRight = '0.25em';
      }

      const wordInner = document.createElement('span');
      wordInner.className = 'reveal-word-inner';
      wordInner.innerText = word;

      wordContainer.appendChild(wordInner);
      title.appendChild(wordContainer);
    });

    gsap.from(title.querySelectorAll('.reveal-word-inner'), {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: '120%',
      rotationZ: 2,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.04,
    });
  });

  // 2. Hero Image Parallax & Scale
  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    gsap.to(heroImg, {
      scrollTrigger: {
        trigger: ".image-reveal",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: "15%",
      scale: 1,
      ease: "none"
    });
  }

  // 3. Simple fade up for grid cards
  const gridGroups = document.querySelectorAll(".group");
  if (gridGroups.length > 0) {
    gsap.from(gridGroups, {
      scrollTrigger: {
        trigger: ".grid",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out"
    });
  }

  // 4. Staggered fade in for lists/cards
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length > 0) {
    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: "#services-grid",
        start: "top 85%"
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }

  // 5. Why Choose Section Cards
  const chooseCards = document.querySelectorAll('#why-choose .bg-white');
  if (chooseCards.length > 0) {
    gsap.from(chooseCards, {
      scrollTrigger: {
        trigger: '#why-choose',
        start: 'top 80%'
      },
      y: 20,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  // 6. Residential & Commercial Section Cards
  const resCommCards = document.querySelectorAll('#residential-commercial .bg-white');
  if (resCommCards.length > 0) {
    gsap.from(resCommCards, {
      scrollTrigger: {
        trigger: '#residential-commercial',
        start: 'top 80%'
      },
      y: 22,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }

  // 7. Contact Banner animation
  const contactContainer = document.querySelector('.contact-section-container');
  if (contactContainer) {
    gsap.from(contactContainer, {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%'
      },
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // 8. How It Works Steps animation
  const stepCardsGrid = document.getElementById('step-cards-grid');
  if (stepCardsGrid) {
    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: '#step-cards-grid',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }

  // 9. Testimonials animation
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  if (testimonialsGrid) {
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 85%'
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }
}

/**
 * Contact Form validation and success notification
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Pre-select service from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        const val = serviceSelect.options[i].value;
        if (val === serviceParam || val.includes(serviceParam) || serviceParam.includes(val)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error styling
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      // Remove any existing errors
      const errorDiv = document.getElementById(`${input.id}-error`);
      if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
      }
      input.classList.remove('border-red-500');
    });

    // Validate fields
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    // Helper to show error
    const showError = (field, msg) => {
      field.classList.add('border-red-500');
      const errorDiv = document.getElementById(`${field.id}-error`);
      if (errorDiv) {
        errorDiv.textContent = msg;
        errorDiv.classList.remove('hidden');
      }
      isValid = false;
    };

    if (name && !name.value.trim()) {
      showError(name, 'Please enter your name.');
    }

    if (phone && !phone.value.trim()) {
      showError(phone, 'Please enter your phone number.');
    } else if (phone) {
      // Basic phone format check: must contain only digits, spaces, +, -, or ()
      const phoneRegex = /^[0-9\s\+\-\(\)]{9,15}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number (e.g. 079 272 4923).');
      }
    }

    if (email && !email.value.trim()) {
      showError(email, 'Please enter your email address.');
    } else if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
      }
    }

    if (service && !service.value) {
      showError(service, 'Please select a service.');
    }

    if (message && !message.value.trim()) {
      showError(message, 'Please enter your message.');
    }

    if (isValid) {
      // Static form submission success demonstration
      if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      
      // Auto-hide success message after 7 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.add('hidden');
        }
      }, 7000);
    }
  });
}

/**
 * Lightweight interface polish: sticky nav depth, mobile scroll lock,
 * and form affordances. It is defensive and will not break if elements are absent.
 */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav.sticky');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('mobile-menu-btn');

  const updateNavDepth = () => {
    if (!nav) return;
    nav.classList.toggle('nav-scrolled', window.scrollY > 8);
  };

  updateNavDepth();
  window.addEventListener('scroll', updateNavDepth, { passive: true });

  if (mobileMenu && menuButton) {
    const observer = new MutationObserver(() => {
      document.documentElement.classList.toggle('overflow-hidden', mobileMenu.classList.contains('open'));
      document.body.classList.toggle('overflow-hidden', mobileMenu.classList.contains('open'));
    });
    observer.observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });
  }
});
