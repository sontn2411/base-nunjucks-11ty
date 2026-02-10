
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById('main-header');
  if (header) {
    let triggerHeight = window.innerHeight; // Default fallback

    const updateTriggerHeight = () => {
      const banner = document.getElementById('home-banner');
      if (banner && banner.offsetHeight > 0) {
        triggerHeight = banner.offsetHeight - 100;
      }
    };

    // Initial calculation
    updateTriggerHeight();

    // Recalculate on load (images, etc.)
    window.addEventListener('load', () => {
      updateTriggerHeight();
      handleScroll();
    });

    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        if (window.scrollY > triggerHeight && triggerHeight > 0) {
          header.classList.remove('-translate-y-full');
        } else {
          header.classList.add('-translate-y-full');
        }
      } else {
        header.classList.remove('-translate-y-full');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Reset header position on resize to ensure it doesn't get stuck hidden
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        header.classList.remove('-translate-y-full');
      }
    });
  }

  // Home page specific logic here
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((el) => observer.observe(el));
});
