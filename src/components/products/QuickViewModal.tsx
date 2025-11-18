import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    description?: string;
    colors?: string[];
    sizes?: string[];
    stock?: number;
  };
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
  const displayPrice = product.salePrice || product.price;

  const colorMap: { [key: string]: string } = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Rojo': '#EF4444',
    'Azul': '#3B82F6',
    'Verde': '#10B981',
    'Amarillo': '#FBBF24',
    'Rosa': '#EC4899',
    'Gris': '#6B7280',
    'Marrón': '#92400E',
    'Naranja': '#F97316',
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-y-auto"
           data-aos="zoom-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors z-10"
        >
          <Icon icon="X" size={24} color="#6b7280" />
        </button>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="flex flex-col">
              <div className="relative bg-neutral-100 rounded-lg aspect-square mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              {/* Title and Rating */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                  {product.name}
                </h2>

                {product.rating && product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.round(product.rating!)
                              ? 'text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">
                      ({product.reviews || 0} reseñas)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b">
                <span className="text-3xl font-bold text-primary-600">
                  €{displayPrice.toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-lg text-neutral-500 line-through">
                    €{product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-neutral-600 mb-6">{product.description}</p>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Color: <span className="text-primary-600">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-primary-600 ring-2 ring-primary-300'
                            : 'border-neutral-300 hover:border-neutral-400'
                        }`}
                        style={{
                          backgroundColor:
                            colorMap[color] || `hsl(${Math.random() * 360}, 70%, 50%)`,
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Talla: <span className="text-primary-600">{selectedSize}</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-neutral-900 border-neutral-300 hover:border-primary-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <Icon icon="Minus" size={18} color="#6b7280" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border border-neutral-300 rounded-lg py-2 font-semibold"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <Icon icon="Plus" size={18} color="#6b7280" />
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className="mb-6">
                  <p
                    className={`text-sm font-semibold ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} en stock`
                      : 'Agotado'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Icon icon="ShoppingCart" size={20} color="white" />
                  Agregar al Carrito
                </button>
                <button className="p-3 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors">
                  <Icon icon="Heart" size={20} color="#6b7280" />
                </button>
              </div>

              {/* Ver Detalles Link */}
              <a
                href={`/products/${product.slug}`}
                className="mt-4 text-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Ver detalles completos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
