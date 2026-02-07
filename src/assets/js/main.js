document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');

  if (header) {
    const banner = document.getElementById('home-banner');
    const triggerHeight = banner ? banner.offsetHeight - 100 : window.innerHeight;

    // Initial check: Ensure header is visible on mobile immediately
    if (window.innerWidth < 1024) {
      header.classList.remove('-translate-y-full');
    }

    window.addEventListener('scroll', () => {
      // Only hide/show header on desktop (lg breakpoint = 1024px)
      if (window.innerWidth >= 1024) {
        if (window.scrollY > triggerHeight) {
          header.classList.remove('-translate-y-full');
        } else {
          header.classList.add('-translate-y-full');
        }
      } else {
        // Ensure header is always visible on mobile
        header.classList.remove('-translate-y-full');
      }
    });

    // Reset header position on resize to ensure it doesn't get stuck hidden
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        header.classList.remove('-translate-y-full');
      }
    });
  }

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (mobileMenuBtn && mobileMenu) {
    function toggleMenu() {
      const isHidden = mobileMenu.classList.contains('hidden');
      // console.log(isHidden);
      if (isHidden) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        if (iconMenu) iconMenu.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        // Trigger fade in
        setTimeout(() => {
          mobileMenu.classList.remove('opacity-0');
        }, 10);
      } else {
        // Close menu
        mobileMenu.classList.add('opacity-0');

        if (iconMenu) iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');

        // Wait for transition to finish before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
  }

  // Scroll Animation Logic
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
});
