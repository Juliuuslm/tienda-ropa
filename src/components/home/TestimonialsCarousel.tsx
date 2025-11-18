import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@/components/common/Icon';
import { testimonialCarouselConfig } from '@/utils/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    role: 'Cliente Verificado',
    text: 'Excelente calidad en las prendas y envío muy rápido. Volveré a comprar sin duda.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: '2',
    name: 'Juan López',
    role: 'Cliente Verificado',
    text: 'Servicio al cliente muy atento y responsivo. Las tallas son correctas. Muy recomendado.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  },
  {
    id: '3',
    name: 'Sofia Martínez',
    role: 'Cliente Verificado',
    text: 'Los diseños son modernos y de buena calidad. La mejor tienda online que he encontrado.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
  },
  {
    id: '4',
    name: 'Carlos Rodríguez',
    role: 'Cliente Verificado',
    text: 'Producto tal como se describe. La devolución fue rápida y sin complicaciones.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
];

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials = defaultTestimonials,
}) => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Miles de clientes satisfechos confían en nosotros
          </p>
        </div>

        <Swiper
          {...testimonialCarouselConfig}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 mx-4 min-h-96">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon
                      key={i}
                      icon="Star"
                      size={20}
                      color="#ffed00"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-neutral-700 text-lg mb-8 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-primary-200"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper styles */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 107, 107, 0.8);
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
          background: rgba(255, 107, 107, 1);
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: #ff5252;
        }
      `}</style>
    </section>
  );
};
