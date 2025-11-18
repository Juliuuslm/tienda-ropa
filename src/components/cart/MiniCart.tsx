import React, { useState } from 'react';
import { useCartSync } from '@/hooks/useCart';
import { Icon } from '@/components/common/Icon';

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
  const { items, isLoading } = useCartSync();
  const [isOpen, setIsOpen] = useState(false);

  const count = items.length;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const displayItems = items.slice(0, 3); // Mostrar solo últimos 3

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative px-4 py-2 rounded-lg hover:bg-neutral-100 transition-all duration-200 flex items-center gap-2 group"
        title="Ver carrito"
      >
        <div className="relative">
          <Icon icon="ShoppingCart" size={20} color="#1f2937" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {count}
            </span>
          )}
        </div>
        <span className="hidden md:inline text-sm font-semibold text-neutral-700 group-hover:text-primary-600 transition-colors">
          Carrito
        </span>
      </button>

      {/* Dropdown Mejorado */}
      <div
        className={`absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md p-0 z-50 transition-all duration-300 origin-top-right transform ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-primary-200 flex items-center justify-between rounded-t-xl">
          <h3 className="font-bold text-neutral-900">Mi Carrito</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <Icon icon="X" size={20} />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="px-6 py-8 text-center">
            <Icon icon="Loader" size={32} color="#ff5252" className="mx-auto mb-3 animate-spin" />
            <p className="text-neutral-600">Cargando carrito...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Icon icon="ShoppingCart" size={48} color="#d1d5db" className="mx-auto mb-4 opacity-50" />
            <p className="text-neutral-600 font-medium mb-4">El carrito está vacío</p>
            <a
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="inline-block text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Continuar comprando →
            </a>
          </div>
        ) : (
          <>
            {/* Items Preview */}
            <div className="px-6 py-4 space-y-3 max-h-64 overflow-y-auto border-b border-neutral-200">
              {displayItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-200 group-hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <a
                      href={`/products/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-neutral-900 hover:text-primary-600 line-clamp-2 transition-colors"
                    >
                      {item.name}
                    </a>
                    <p className="text-xs text-neutral-600 mt-1">
                      {item.color && <span>{item.color} </span>}
                      {item.size && <span>• {item.size}</span>}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-neutral-600">Qty: {item.quantity}</span>
                      <span className="text-sm font-bold text-primary-600">
                        €{(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Items Count Info */}
              {items.length > 3 && (
                <div className="px-3 py-2 text-center text-xs text-neutral-600 bg-neutral-50 rounded-lg">
                  +{items.length - 3} artículos más en el carrito
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 font-medium">Subtotal:</span>
                <span className="text-2xl font-bold text-primary-600">
                  €{total.toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <a
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Icon icon="ShoppingCart" size={18} />
                  Ver Carrito Completo
                </a>
                <a
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Icon icon="ArrowRight" size={18} />
                  Ir a Checkout
                </a>
              </div>

              {/* Info */}
              <div className="text-xs text-neutral-600 text-center space-y-1 pt-2 border-t border-neutral-200">
                <p>✓ Envío gratis a partir de €50</p>
                <p>✓ Devoluciones gratis 30 días</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Overlay para cerrar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
