import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface BrandLogo {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

interface BrandLogosProps {
  brands?: BrandLogo[];
  title?: string;
}

const defaultBrands: BrandLogo[] = [
  {
    id: '1',
    name: 'Zara',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Zara_Logo.svg',
    url: '#',
  },
  {
    id: '2',
    name: 'H&M',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png',
    url: '#',
  },
  {
    id: '3',
    name: 'Forever 21',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Forever_21_logo.svg/1280px-Forever_21_logo.svg.png',
    url: '#',
  },
  {
    id: '4',
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Nike_logo.svg',
    url: '#',
  },
  {
    id: '5',
    name: 'ASOS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/ASOS_logo.svg/1280px-ASOS_logo.svg.png',
    url: '#',
  },
  {
    id: '6',
    name: 'Shein',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Shein_logo.svg/1280px-Shein_logo.svg.png',
    url: '#',
  },
  {
    id: '7',
    name: 'Uniqlo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Uniqlo_logo.svg/1280px-Uniqlo_logo.svg.png',
    url: '#',
  },
  {
    id: '8',
    name: 'Gap',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/The_Gap_logo.svg/1280px-The_Gap_logo.svg.png',
    url: '#',
  },
];

export const BrandLogos: React.FC<BrandLogosProps> = ({
  brands = defaultBrands,
  title = 'Marcas que Amamos',
}) => {
  return (
    <section className="py-16 bg-white border-y border-neutral-200" data-aos="fade-up">
      <div className="container">
        {/* Header */}
        {title && (
          <div className="text-center mb-12" data-aos="fade-down">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              {title}
            </h2>
            <p className="text-neutral-600">
              Trabajamos con las mejores marcas de la industria
            </p>
          </div>
        )}

        {/* Brands Carousel */}
        <div className="relative px-0 md:px-8">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            className="brand-logos-swiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <a
                  href={brand.url || '#'}
                  className="flex items-center justify-center h-20 group"
                  title={brand.name}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-16 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
        </div>
      </div>

      <style jsx>{`
        :global(.brand-logos-swiper .swiper-wrapper) {
          align-items: center;
        }

        :global(.brand-logos-swiper .swiper-slide) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};
