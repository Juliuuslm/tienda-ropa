import React, { useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { WishlistButton } from './WishlistButton';
import { CompareButton } from './CompareButton';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  description: string;
  stock?: number;
  colors?: string[];
  sizes?: string[];
  category?: string;
  tags?: string[];
}

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');

  const displayPrice = product.salePrice || product.price;
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = product.stock || 1;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleImageChange = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Galería de imágenes */}
        <div>
          {/* Imagen principal */}
          <div className="relative bg-neutral-100 rounded-lg overflow-hidden aspect-square mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{discount}%
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => handleImageChange(product.image)}
                className={`relative rounded overflow-hidden cursor-pointer transition-all ${
                  mainImage === product.image ? 'ring-2 ring-primary-600' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Miniatura 1" className="w-full h-full object-cover" />
              </button>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleImageChange(img)}
                  className={`relative rounded overflow-hidden cursor-pointer transition-all ${
                    mainImage === img ? 'ring-2 ring-primary-600' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 2}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div>
          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
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

          {/* Precio */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl md:text-3xl font-bold text-primary-600">${displayPrice.toFixed(2)}</span>
              {product.salePrice && (
                <span className="text-lg text-neutral-500 line-through">${product.price.toFixed(2)}</span>
              )}
            </div>
            {product.stock !== undefined && (
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `En stock: ${product.stock} unidades` : 'No disponible'}
              </p>
            )}
          </div>

          {/* Descripción breve */}
          <p className="text-neutral-700 mb-8">{product.description}</p>

          {/* Colores */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block font-semibold mb-3">Color</label>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 border rounded transition-all ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50 font-semibold'
                        : 'border-neutral-300 hover:border-primary-600'
                    }`}
                    aria-pressed={selectedColor === color}
                    title={`Seleccionar color: ${color}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tallas */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block font-semibold mb-3">Talla</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 border rounded transition-all ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 font-semibold'
                        : 'border-neutral-300 hover:border-primary-600'
                    }`}
                    aria-pressed={selectedSize === size}
                    title={`Seleccionar talla: ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className="mb-8">
            <label className="block font-semibold mb-3">Cantidad</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={product.stock || 999}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 border border-neutral-300 rounded px-3 py-2 text-center"
                aria-label="Cantidad de productos"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (product.stock || 999)}
                className="px-3 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="sm:col-span-2">
              <AddToCartButton
                product={product}
                selectedColor={selectedColor || undefined}
                selectedSize={selectedSize || undefined}
                quantity={quantity}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <WishlistButton
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  variant="button"
                  className="w-full text-sm px-3 py-3"
                />
              </div>
            </div>
          </div>

          {/* Compare button */}
          <CompareButton
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            salePrice={product.salePrice}
            image={product.image}
            category={product.category || ''}
            rating={product.rating}
            stock={product.stock}
            colors={product.colors}
            sizes={product.sizes}
            className="w-full"
          />

          {/* Meta información */}
          <div className="border-t mt-8 pt-6 text-sm text-neutral-600 space-y-2">
            <p>
              <strong>SKU:</strong> {product.id}
            </p>
            <p>
              <strong>Categoría:</strong> {product.category}
            </p>
            {product.tags && product.tags.length > 0 && (
              <p>
                <strong>Tags:</strong> {product.tags.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs - Descripción, Info adicional, Reseñas */}
      <div className="border-t pt-12">
        <div className="flex gap-8 mb-8 border-b">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === 'description'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Descripción
          </button>
          <button
            onClick={() => setActiveTab('additional')}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === 'additional'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Información Adicional
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Reseñas
          </button>
        </div>

        {/* Contenido de tabs */}
        <div>
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Descripción del Producto</h3>
              <p className="text-neutral-700 mb-4">{product.description}</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Producto de alta calidad</li>
                <li>Múltiples opciones de color y talla</li>
                <li>Envío rápido disponible</li>
                <li>Garantía de satisfacción</li>
              </ul>
            </div>
          )}

          {activeTab === 'additional' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Información Adicional</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y">
                  {product.colors && (
                    <tr>
                      <td className="py-2 font-semibold text-neutral-700 w-1/4">Colores</td>
                      <td className="py-2 text-neutral-600">{product.colors.join(', ')}</td>
                    </tr>
                  )}
                  {product.sizes && (
                    <tr>
                      <td className="py-2 font-semibold text-neutral-700 w-1/4">Tallas</td>
                      <td className="py-2 text-neutral-600">{product.sizes.join(', ')}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2 font-semibold text-neutral-700 w-1/4">Categoría</td>
                    <td className="py-2 text-neutral-600">{product.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Reseñas de Clientes</h3>
              <p className="text-neutral-600">
                Este producto tiene {product.reviews} reseña{product.reviews !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
