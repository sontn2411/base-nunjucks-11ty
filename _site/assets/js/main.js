document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        header.classList.remove('-translate-y-full');
      } else {
        header.classList.add('-translate-y-full');
      }
    });
  }

  // Fade Carousel Logic
  const carousel = document.getElementById('fade-carousel');
  if (carousel) {
    const items = carousel.querySelectorAll('[data-carousel-item]');
    const indicators = carousel.querySelectorAll('[data-slide-index]');
    let currentIndex = 0;
    const intervalTime = 5000;

    const showSlide = (index) => {
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.remove('opacity-0', 'z-0');
          item.classList.add('opacity-100', 'z-10');
        } else {
          item.classList.remove('opacity-100', 'z-10');
          item.classList.add('opacity-0', 'z-0');
        }
      });

      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.remove('bg-white');
          indicator.classList.add('bg-primary');
        } else {
          indicator.classList.remove('bg-primary');
          indicator.classList.add('bg-white');
        }
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(currentIndex);
    };

    let interval = setInterval(nextSlide, intervalTime);

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = i;
        showSlide(currentIndex);
        interval = setInterval(nextSlide, intervalTime);
      });
    });

    // Swipe Support
    let startX = 0;
    let isDragging = false;

    // Touch Events
    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
      clearInterval(interval);
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].screenX;
      handleSwipe(startX, endX);
      interval = setInterval(nextSlide, intervalTime);
    });

    // Mouse Events
    carousel.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
      clearInterval(interval);
      e.preventDefault();
    });

    carousel.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.clientX;
      handleSwipe(startX, endX);
      interval = setInterval(nextSlide, intervalTime);
    });

    carousel.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        interval = setInterval(nextSlide, intervalTime);
      }
    });

    const handleSwipe = (start, end) => {
      const threshold = 50;
      if (start - end > threshold) {
        nextSlide();
      } else if (end - start > threshold) {
        prevSlide();
      }
    };
  }
});
