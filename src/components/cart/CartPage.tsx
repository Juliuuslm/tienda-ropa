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

export const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  // Cargar carrito desde localStorage
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

  const updateQuantity = (id: string, quantity: number) => {
    const maxQty = 999;
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    if (quantity > maxQty) quantity = maxQty;

    const updatedItems = items.map((item) => (item.id === id ? { ...item, quantity } : item));
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 && subtotal < 100 ? 10 : 0; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (isLoading) {
    return <div className="text-center py-12">Cargando carrito...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 text-neutral-400"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-neutral-600 mb-6">Agrega productos para comenzar</p>
        <a
          href="/shop"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continuar comprando
        </a>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items del carrito */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-7 gap-4 bg-neutral-50 p-4 font-semibold text-sm border-b border-neutral-200">
              <div className="">Imagen</div>
              <div className="col-span-2">Producto</div>
              <div className="">Cantidad</div>
              <div className="">Precio</div>
              <div className="">Subtotal</div>
              <div className="text-center">Acción</div>
            </div>

            {/* Items */}
            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4"
                >
                  {/* Desktop View */}
                  <div className="hidden lg:grid grid-cols-7 gap-4 items-center">
                    {/* Imagen */}
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>

                    {/* Nombre y atributos */}
                    <div className="col-span-2 min-w-0">
                      <a href={`/products/${item.slug}`} className="font-semibold text-primary-600 hover:underline block truncate">
                        {item.name}
                      </a>
                      <div className="text-xs text-neutral-600 mt-1 space-y-0.5">
                        {item.color && <div>Color: {item.color}</div>}
                        {item.size && <div>Talla: {item.size}</div>}
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div>
                      <div className="flex items-center gap-2 border border-neutral-300 rounded w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-neutral-100 text-sm"
                          aria-label="Disminuir cantidad"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-10 text-center border-0 py-1 text-sm"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-neutral-100 text-sm"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Precio unitario */}
                    <div className="text-sm font-semibold">${item.price.toFixed(2)}</div>

                    {/* Subtotal */}
                    <div className="text-sm font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</div>

                    {/* Botón remover */}
                    <div className="text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors rounded border border-red-200 inline-flex items-center justify-center gap-1.5 text-sm"
                        title="Remover del carrito"
                        aria-label={`Remover ${item.name} del carrito`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Remover
                      </button>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="lg:hidden">
                    <div className="flex gap-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <a href={`/products/${item.slug}`} className="font-semibold text-primary-600 hover:underline block text-sm">
                          {item.name}
                        </a>
                        <div className="text-xs text-neutral-600 mt-2 space-y-1">
                          {item.color && <div>Color: {item.color}</div>}
                          {item.size && <div>Talla: {item.size}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-neutral-600">Cantidad</label>
                        <div className="flex items-center gap-2 border border-neutral-300 rounded w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-neutral-100 text-sm"
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-10 text-center border-0 py-1 text-sm"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-neutral-100 text-sm"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-neutral-600">Precio</label>
                        <div className="text-sm font-semibold">${item.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center justify-between bg-neutral-50 p-3 rounded mb-4">
                      <div>
                        <span className="text-xs text-neutral-600">Subtotal:</span>
                        <div className="font-bold text-primary-600 text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors rounded border border-red-200 inline-flex items-center gap-1.5 text-sm"
                        title="Remover del carrito"
                        aria-label={`Remover ${item.name} del carrito`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex gap-4">
            <a
              href="/shop"
              className="flex-1 border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-center flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Continuar comprando
            </a>
            <button
              onClick={() => setShowClearConfirmation(true)}
              className="flex-1 border border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center justify-center gap-2"
              title="Vaciar el carrito completamente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Resumen de pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Resumen</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Envío</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
              )}

              {shipping === 0 && subtotal > 0 && (
                <div className="flex justify-between text-sm bg-green-50 p-2 rounded border border-green-200">
                  <span className="text-green-700">🎉 Envío gratis</span>
                </div>
              )}

              {shipping > 0 && subtotal < 100 && (
                <div className="flex justify-between text-sm bg-blue-50 p-2 rounded border border-blue-200">
                  <span className="text-blue-700 text-xs">Envío gratis a partir de $100</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Impuestos</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <a
              href="/checkout"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-center block"
            >
              Proceder al Checkout
            </a>

            <p className="text-center text-xs text-neutral-600 mt-4">
              Se aplicarán impuestos según tu ubicación
            </p>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-fadeIn">
            <h3 className="text-xl font-bold mb-3 text-neutral-900">Vaciar carrito</h3>
            <p className="text-neutral-600 mb-6">
              ¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirmation(false)}
                className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirmation(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
