import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ProductCard } from './ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  category?: string;
  stock?: number;
  colors?: string[];
  sizes?: string[];
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: string;
  title?: string;
  description?: string;
}

const relatedProductsConfig = {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: true,
  pagination: {
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  title = 'Productos Relacionados',
  description = 'Descubre otros productos que podrían interesarte',
}) => {
  // Filter out current product if provided
  const relatedProducts = currentProductId
    ? products.filter((p) => p.id !== currentProductId)
    : products;

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 border-t border-neutral-200"
      data-aos="fade-up"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-neutral-600 text-lg">{description}</p>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            {...relatedProductsConfig}
            modules={[Navigation, Pagination, Autoplay]}
            className="related-products-swiper"
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  image={product.image}
                  rating={product.rating}
                  reviews={product.reviews}
                  stock={product.stock}
                  category={product.category}
                  colors={product.colors}
                  sizes={product.sizes}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        :global(.related-products-swiper .swiper-button-next),
        :global(.related-products-swiper .swiper-button-prev) {
          width: 44px;
          height: 44px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        :global(.related-products-swiper .swiper-button-next:hover),
        :global(.related-products-swiper .swiper-button-prev:hover) {
          background-color: #ff5252;
          box-shadow: 0 4px 16px rgba(255, 82, 82, 0.3);
        }

        :global(.related-products-swiper .swiper-button-next::after),
        :global(.related-products-swiper .swiper-button-prev::after) {
          font-size: 20px;
          font-weight: bold;
        }

        :global(.related-products-swiper .swiper-button-next::after) {
          color: #ff5252;
        }

        :global(.related-products-swiper .swiper-button-prev::after) {
          color: #ff5252;
        }

        :global(.related-products-swiper .swiper-button-next:hover::after),
        :global(.related-products-swiper .swiper-button-prev:hover::after) {
          color: white;
        }

        :global(.related-products-swiper .swiper-pagination-bullet) {
          background-color: #e5e7eb;
          opacity: 1;
        }

        :global(.related-products-swiper .swiper-pagination-bullet-active) {
          background-color: #ff5252;
        }
      `}</style>
    </section>
  );
};
