import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Icon } from '@/components/common/Icon';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface LookItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  link: string;
}

interface LookbookGalleryProps {
  looks?: LookItem[];
}

const defaultLooks: LookItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1485528122519-5e9e20ad2fd3?w=500&h=600&fit=crop',
    title: 'Urban Elegance',
    description: 'Contemporary street style',
    category: 'Casual',
    link: '/shop?category=casual',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&h=600&fit=crop',
    title: 'Office Chic',
    description: 'Professional sophistication',
    category: 'Formal',
    link: '/shop?category=formal',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&h=600&fit=crop',
    title: 'Summer Vibes',
    description: 'Light and breezy collection',
    category: 'Seasonal',
    link: '/shop?category=seasonal',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop',
    title: 'Edgy Style',
    description: 'Bold and daring looks',
    category: 'Trendy',
    link: '/shop?category=trendy',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1465901152029-0a3620da7873?w=500&h=600&fit=crop',
    title: 'Minimalist',
    description: 'Less is more philosophy',
    category: 'Essential',
    link: '/shop?category=essential',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=600&fit=crop',
    title: 'Romantic',
    description: 'Feminine and flowing designs',
    category: 'Dresses',
    link: '/shop?category=dresses',
  },
];

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({ looks = defaultLooks }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white" data-aos="fade-up">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-down">
          <span className="inline-block text-primary-600 text-sm font-bold tracking-widest mb-3">
            LOOKBOOK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Inspiración & Estilo
          </h2>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto">
            Descubre outfits curados por nuestros expertos en moda para tu mejor versión
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.lookbook-next',
              prevEl: '.lookbook-prev',
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            className="lookbook-swiper"
          >
            {looks.map((look) => (
              <SwiperSlide key={look.id} className="w-96">
                <div className="relative h-96 group cursor-pointer rounded-2xl overflow-hidden">
                  {/* Image */}
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Category Badge */}
                    <span className="inline-block text-primary-400 text-xs font-bold tracking-widest mb-2">
                      {look.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-1">{look.title}</h3>

                    {/* Description */}
                    <p className="text-neutral-200 text-sm mb-4">{look.description}</p>

                    {/* CTA Button */}
                    <a
                      href={look.link}
                      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:gap-3 group/btn"
                    >
                      Comprar Look
                      <Icon icon="ArrowRight" size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Corner Icon */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon icon="Eye" size={20} color="white" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="lookbook-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-16 md:translate-x-0 bg-white hover:bg-primary-600 text-neutral-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Previous look"
          >
            <Icon icon="ChevronLeft" size={24} />
          </button>

          <button
            className="lookbook-next absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-16 md:translate-x-0 bg-white hover:bg-primary-600 text-neutral-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Next look"
          >
            <Icon icon="ChevronRight" size={24} />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Icon icon="Sparkles" size={20} />
            Ver Colección Completa
            <Icon icon="ArrowRight" size={20} />
          </a>
        </div>
      </div>

      <style jsx>{`
        :global(.lookbook-swiper) {
          padding: 0 2rem;
        }

        :global(.lookbook-swiper .swiper-slide) {
          width: auto;
          height: auto;
        }

        :global(.lookbook-swiper .swiper-slide-active) {
          filter: none;
        }

        :global(.lookbook-swiper .swiper-slide:not(.swiper-slide-active)) {
          filter: brightness(0.8);
        }

        @media (max-width: 768px) {
          :global(.lookbook-swiper) {
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
};
