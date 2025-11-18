import React, { useEffect } from 'react';

export const StickyHeaderScript: React.FC = () => {
  useEffect(() => {
    let lastScrollTop = 0;
    let isScrolling = false;

    const handleScroll = () => {
      const header = document.getElementById('main-header');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (!header) return;

      // Detectar dirección del scroll
      const isScrollingDown = scrollTop > lastScrollTop;
      const hasScrolled = scrollTop > 0;

      if (hasScrolled) {
        // Usuario ha hecho scroll hacia abajo
        if (isScrollingDown) {
          header.classList.add('header-shrink');
          header.classList.remove('header-expand');
        } else {
          // Usuario ha hecho scroll hacia arriba
          header.classList.remove('header-shrink');
          header.classList.add('header-expand');
        }

        // Agregar shadow cuando hay scroll
        header.classList.add('header-shadow');
      } else {
        // En la parte superior
        header.classList.remove('header-shrink');
        header.classList.remove('header-expand');
        header.classList.remove('header-shadow');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      isScrolling = false;
    };

    const scrollListener = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(handleScroll);
        isScrolling = true;
      }
    };

    // Throttle the scroll event
    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // Solo renderiza estilos CSS para el header
  return (
    <style jsx global>{`
      /* Sticky Header Animations */
      #main-header {
        transition: all 0.3s ease-in-out;
      }

      #main-header.header-shrink {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }

      #main-header.header-shrink .logo {
        font-size: 1.25rem;
      }

      #main-header.header-shrink .search-bar {
        max-width: calc(100% - 300px);
      }

      #main-header.header-expand {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      #main-header.header-shadow {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      /* Logo animation */
      .logo {
        transition: font-size 0.3s ease-in-out;
      }

      /* Search bar animation */
      .search-bar {
        transition: max-width 0.3s ease-in-out;
      }

      /* Cart button animation */
      .cart-button {
        transition: all 0.3s ease-in-out;
      }

      #main-header.header-shrink .cart-button {
        scale: 0.95;
      }

      /* Slide-up animation */
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-slide-up {
        animation: slideUp 0.3s ease-out forwards;
      }

      /* Mini cart dropdown scale animation */
      .mini-cart-dropdown {
        transform-origin: top right;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .mini-cart-dropdown.show {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      .mini-cart-dropdown.hide {
        opacity: 0;
        transform: scale(0.95) translateY(-8px);
        pointer-events: none;
      }

      /* Header container smooth transition */
      #main-header > div {
        transition: all 0.3s ease-in-out;
      }
    `}</style>
  );
};
