import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Button from '@/components/common/Button.astro';
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
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Swiper
        {...heroSliderConfig}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: slide.bgImage,
              }}
            >
              {/* Overlay para mejorar legibilidad del texto */}
              <div className="absolute inset-0 bg-black/30 z-10"></div>

              {/* Content */}
              <div className="relative z-20 text-center text-white px-4 max-w-2xl animate-slide-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-95">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.ctaLink}
                  className="inline-block bg-white text-neutral-900 font-bold py-3 px-8 rounded-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper navigation */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: white;
          width: 32px;
          border-radius: 6px;
        }

        .swiper-pagination {
          bottom: 30px;
        }
      `}</style>
    </section>
  );
};
