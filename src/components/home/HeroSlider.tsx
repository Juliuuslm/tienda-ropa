import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Icon } from '@/components/common/Icon';
import { heroSliderConfig } from '@/utils/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bgImage: string;
  bgGradient?: string;
}

interface HeroSliderProps {
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Colección Nueva',
    subtitle: 'Descubre nuestras prendas más modernas y vibrantes',
    cta: 'Ver Colección',
    ctaLink: '/shop',
    bgImage: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
  },
  {
    id: '2',
    title: 'Ofertas Especiales',
    subtitle: 'Descuentos de hasta 50% en colecciones seleccionadas',
    cta: 'Comprar Ahora',
    ctaLink: '/shop?filter=sale',
    bgImage: 'linear-gradient(135deg, #4ecdc4 0%, #2ebbac 100%)',
  },
  {
    id: '3',
    title: 'Exclusividades',
    subtitle: 'Prendas únicas diseñadas especialmente para ti',
    cta: 'Explorar',
    ctaLink: '/shop?filter=exclusive',
    bgImage: 'linear-gradient(135deg, #8338ec 0%, #ff006e 100%)',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides = defaultSlides }) => {
  const swiperRef = useRef<any>(null);

  const handleSlideChange = () => {
    // Reset animations on slide change
    const contentElements = document.querySelectorAll('.hero-content-element');
    contentElements.forEach((el) => {
      el.classList.remove('animate-in');
      // Trigger reflow to restart animation
      void el.offsetHeight;
      el.classList.add('animate-in');
    });
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" style={{ zIndex: 1 }}>
      <Swiper
        {...heroSliderConfig}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        className="w-full h-full"
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        onInit={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: slide.bgImage,
              }}
            >
              {/* Overlay para mejorar legibilidad del texto */}
              <div className="absolute inset-0 bg-black/30 z-10"></div>

              {/* Animated Background Elements */}
              <div className="absolute inset-0 z-5 opacity-40">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000"></div>
              </div>

              {/* Content */}
              <div className="relative z-20 text-center text-white px-4 max-w-2xl">
                {/* Title */}
                <h1
                  className="hero-content-element text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-in"
                  style={{ animationDelay: '0s' }}
                >
                  <span className="inline-block">{slide.title}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 blur-xl pointer-events-none"></div>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-content-element text-lg md:text-xl mb-8 opacity-95 animate-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <a
                  href={slide.ctaLink}
                  className="hero-content-element inline-flex items-center justify-center gap-2 bg-white text-neutral-900 font-bold py-3 px-8 rounded-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl animate-in group"
                  style={{ animationDelay: '0.4s' }}
                >
                  {slide.cta}
                  <Icon
                    icon="ArrowRight"
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper navigation & animations */}
      <style jsx>{`
        /* Swiper Navigation Buttons */
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 20px;
        }

        /* Swiper Pagination */
        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-bullet:hover) {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }

        :global(.swiper-pagination-bullet-active) {
          background: white;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        :global(.swiper-pagination) {
          bottom: 30px;
        }

        /* Hero Content Animations */
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleGlow {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
          }
        }

        @keyframes buttonBounce {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          70% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        :global(.hero-content-element.animate-in) {
          animation: slideUpFade 0.8s ease-out forwards;
        }

        :global(.hero-content-element:nth-of-type(1).animate-in) {
          animation: scaleGlow 1s ease-out forwards;
        }

        :global(.hero-content-element:nth-of-type(3).animate-in) {
          animation: buttonBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Hover effect for title with glow */
        :global(.hero-content-element:first-of-type) {
          position: relative;
        }

        :global(.hero-content-element:first-of-type:hover) {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.2);
        }

        /* Animation delay utilities */
        @keyframes pulse-custom-1000 {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        :global(.animation-delay-1000) {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};
