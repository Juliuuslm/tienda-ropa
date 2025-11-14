import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface AddToCartButtonProps {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity?: number;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onSuccess?: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  selectedSize,
  quantity = 1,
  variant = 'primary',
  size = 'md',
  className = '',
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = async () => {
    // Validaciones
    if (!product.stock || product.stock < quantity) {
      setMessage({
        type: 'error',
        text: `No hay suficiente stock. Disponibles: ${product.stock || 0}`,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Agregar al carrito usando localStorage
      const cartItem: CartItem = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        color: selectedColor,
        size: selectedSize,
      };

      const saved = localStorage.getItem('cart');
      const items: CartItem[] = saved ? JSON.parse(saved) : [];
      items.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(items));

      setMessage({
        type: 'success',
        text: `${product.name} agregado al carrito`,
      });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(null), 3000);

      // Callback opcional
      onSuccess?.();
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al agregar al carrito',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const baseStyles = 'font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded',
    md: 'px-6 py-3 text-base rounded',
    lg: 'px-8 py-4 text-lg rounded',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAddToCart}
        disabled={isLoading || !product.stock || product.stock < quantity}
        className={buttonClasses}
        aria-label={`Agregar ${product.name} al carrito`}
        title={product.stock && product.stock < quantity ? 'Sin stock disponible' : 'Agregar al carrito'}
      >
        {isLoading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Agregando...
          </span>
        ) : product.stock && product.stock < quantity ? (
          'Sin Stock'
        ) : (
          '🛒 Agregar al Carrito'
        )}
      </button>

      {/* Mensaje de feedback */}
      {message && (
        <div
          className={`text-sm font-semibold px-4 py-2 rounded text-center ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}
          role="alert"
        >
          {message.type === 'success' ? '✓ ' : '✕ '}
          {message.text}
        </div>
      )}
    </div>
  );
};
