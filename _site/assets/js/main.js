

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-image");
  if (images.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 5000); // Change image every 5 seconds
  }

  // Mobile Menu Logic
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");

  if (mobileMenuToggle && mobileMenuClose && mobileMenu) {
    const toggleMenu = (show) => {
      if (show) {
        mobileMenu.classList.remove("translate-x-full");
        document.body.classList.add("overflow-hidden");
        mobileMenuToggle.setAttribute("aria-expanded", "true");
      } else {
        mobileMenu.classList.add("translate-x-full");
        document.body.classList.remove("overflow-hidden");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
    };

    mobileMenuToggle.addEventListener("click", () => toggleMenu(true));
    mobileMenuClose.addEventListener("click", () => toggleMenu(false));

    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", () => toggleMenu(false));
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.classList.contains("translate-x-full")) {
        toggleMenu(false);
      }
    });
  }



});
