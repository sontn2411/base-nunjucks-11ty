document.addEventListener('DOMContentLoaded', function () {
  // Mobile side menu logic
  const menuOpenBtn = document.getElementById('mobile-menu-open');
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileSheet = document.getElementById('mobile-sheet');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const body = document.body;

  function toggleMenu(isOpen) {
    if (!mobileSheet || !mobileOverlay) return;
    mobileSheet.classList.toggle('is-open', isOpen);
    mobileOverlay.classList.toggle('is-open', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuOpenBtn && menuCloseBtn && mobileSheet && mobileOverlay) {
    menuOpenBtn.addEventListener('click', () => toggleMenu(true));
    menuCloseBtn.addEventListener('click', () => toggleMenu(false));
    mobileOverlay.addEventListener('click', () => toggleMenu(false));

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(false);
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileSheet.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Mobile Submenu Toggle Logic
    const submenuToggles = mobileSheet.querySelectorAll('.mobile-submenu-toggle');
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const submenu = toggle.nextElementSibling;
        const isOpen = submenu.classList.contains('is-open');

        // Close other open submenus at the same level (optional, but cleaner)
        const parent = toggle.closest('.space-y-6') || toggle.closest('.py-2');
        if (parent) {
          const siblingSubmenus = parent.querySelectorAll(':scope > .space-y-1 > .mobile-submenu');
          const siblingToggles = parent.querySelectorAll(':scope > .space-y-1 > .mobile-submenu-toggle');
          
          siblingSubmenus.forEach(s => {
            if (s !== submenu) s.classList.remove('is-open');
          });
          siblingToggles.forEach(t => {
            if (t !== toggle) {
              t.classList.remove('is-open');
              t.setAttribute('aria-expanded', 'false');
            }
          });
        }

        // Toggle current submenu
        submenu.classList.toggle('is-open', !isOpen);
        toggle.classList.toggle('is-open', !isOpen);
        toggle.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // Navbar Scroll Logic
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 300) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Scroll Animation Observer
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => revealObserver.observe(el));
});




