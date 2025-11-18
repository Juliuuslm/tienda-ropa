import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { WishlistButton } from './WishlistButton';
import { CompareButton } from './CompareButton';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  category?: string;
  colors?: string[];
  sizes?: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  salePrice,
  image,
  rating = 0,
  reviews = 0,
  stock,
  category = 'sin-categoria',
  colors,
  sizes,
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  const displayPrice = salePrice || price;
  const isNew = Math.random() > 0.7; // 30% probabilidad de ser nuevo
  const isBestseller = Math.random() > 0.8; // 20% probabilidad de ser bestseller

  return (
    <>
      <div
        className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:scale-105"
        data-aos="fade-up"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-neutral-100 aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {discount > 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                -{discount}%
              </div>
            )}
            {isNew && (
              <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                NUEVO
              </div>
            )}
            {isBestseller && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                TOP
              </div>
            )}
          </div>

          {/* Quick View Button - Center */}
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
            <div className="bg-white text-primary-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-primary-600 hover:text-white transition-all transform scale-75 group-hover:scale-100 duration-300">
              <Icon icon="Eye" size={20} />
              Vista Rápida
            </div>
          </button>

          {/* Action Buttons on Hover - Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 duration-300">
            <div className="flex-1">
              <WishlistButton
                id={id}
                slug={slug}
                name={name}
                price={displayPrice}
                image={image}
                variant="icon"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <CompareButton
                id={id}
                slug={slug}
                name={name}
                price={price}
                salePrice={salePrice}
                image={image}
                category={category}
                rating={rating}
                stock={stock}
                colors={colors}
                sizes={sizes}
                className="w-full px-2 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Name */}
          <h3 className="text-base md:text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 h-14 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.round(rating) ? 'text-yellow-400' : 'text-neutral-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-neutral-600">({reviews})</span>
            </div>
          )}

          {/* Colors Preview */}
          {colors && colors.length > 0 && (
            <div className="mb-3 flex gap-1.5">
              {colors.slice(0, 5).map((color) => (
                <div
                  key={color}
                  className="w-5 h-5 rounded-full border border-neutral-300 hover:border-primary-600 transition-colors"
                  style={{
                    backgroundColor: color.toLowerCase().includes('negro')
                      ? '#000'
                      : color.toLowerCase().includes('blanco')
                        ? '#fff'
                        : color.toLowerCase().includes('rojo')
                          ? '#ef4444'
                          : color.toLowerCase().includes('azul')
                            ? '#3b82f6'
                            : '#ddd',
                  }}
                  title={color}
                />
              ))}
              {colors.length > 5 && (
                <div className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-bold text-neutral-600">
                  +{colors.length - 5}
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-primary-600">
              €{displayPrice.toFixed(2)}
            </span>
            {salePrice && (
              <span className="text-sm text-neutral-500 line-through">
                €{price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {stock !== undefined && (
            <p className={`text-xs font-semibold mb-3 ${stock > 5 ? 'text-green-600' : stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
              {stock > 5 ? '✓ En stock' : stock > 0 ? `Solo ${stock} disponible` : 'Agotado'}
            </p>
          )}

          {/* Action Button */}
          <a
            href={`/products/${slug}`}
            className="mt-auto bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 text-center group-hover:shadow-lg active:scale-95"
          >
            Ver Detalles
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={{
          id,
          slug,
          name,
          price,
          salePrice,
          image,
          rating,
          reviews,
          colors,
          sizes,
          stock,
          description: `Prenda de alta calidad en la categoría ${category}. Disponible en múltiples colores y talles.`,
        }}
      />
    </>
  );
};
