import React, { useEffect, useState } from 'react';

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

export const MiniCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const count = items.length;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative group">
      <button className="relative px-4 py-2 border border-neutral-300 rounded hover:border-primary-600 flex items-center gap-2" title="Ver carrito">
        🛒 Carrito ({count})
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full hidden group-hover:block bg-white border border-neutral-300 rounded shadow-lg w-80 p-4 z-50">
        {isLoading ? (
          <p className="text-neutral-600 text-center py-4">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="text-neutral-600 text-center py-4">El carrito está vacío</p>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-neutral-600">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-bold text-primary-600">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>

              <a
                href="/cart"
                className="block w-full text-center bg-primary-600 text-white py-2 rounded hover:bg-primary-700 mb-2 transition-colors"
              >
                Ver Carrito
              </a>
              <a
                href="/checkout"
                className="block w-full text-center border border-primary-600 text-primary-600 py-2 rounded hover:bg-primary-50 transition-colors"
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
