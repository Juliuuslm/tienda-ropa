import React, { useState } from 'react';

export interface QuickViewProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
  stock?: number;
}

interface QuickViewProps {
  product: QuickViewProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayPrice = product.salePrice || product.price;
  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-4">
          <h2 className="font-bold text-xl">Vista Rápida</h2>
          <button onClick={onClose} className="text-2xl hover:text-neutral-600">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <div className="relative bg-neutral-100 rounded-lg overflow-hidden aspect-square mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Title */}
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.round(product.rating!) ? 'text-yellow-400' : 'text-neutral-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-neutral-600">({product.reviews} reseñas)</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-600">${displayPrice.toFixed(2)}</span>
                  {product.salePrice && (
                    <span className="text-lg text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>
                {product.stock !== undefined && (
                  <p className={`text-sm mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `En stock: ${product.stock}` : 'No disponible'}
                  </p>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded transition-colors ${
                          selectedColor === color
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-neutral-300 hover:border-primary-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Talla</label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded transition-colors ${
                          selectedSize === size
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-neutral-300 hover:border-primary-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <a
                  href={`/products/${product.slug}`}
                  className="flex-1 bg-primary-600 text-white py-3 rounded font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Ver Detalles
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
