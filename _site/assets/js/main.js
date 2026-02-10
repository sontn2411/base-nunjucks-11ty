document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');

  if (header) {
    header.classList.remove('-translate-y-full')
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
