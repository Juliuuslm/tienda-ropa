import React from 'react';
import { WishlistButton } from './WishlistButton';
import { CompareButton } from './CompareButton';

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
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  const displayPrice = salePrice || price;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-neutral-100 rounded-t-lg aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}

        {/* Action Buttons on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 h-14">
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
            <span className="text-sm text-neutral-600">({reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary-600">
            ${displayPrice.toFixed(2)}
          </span>
          {salePrice && (
            <span className="text-lg text-neutral-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <a
          href={`/products/${slug}`}
          className="mt-auto bg-primary-600 text-white py-2 px-4 rounded font-semibold hover:bg-primary-700 transition-colors duration-200 text-center"
        >
          Ver Detalles
        </a>
      </div>
    </div>
  );
};
