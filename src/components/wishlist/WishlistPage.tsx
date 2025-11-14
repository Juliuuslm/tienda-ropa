import React, { useEffect, useState } from 'react';

interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

export const WishlistPage: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      const parsed = JSON.parse(saved);
      const updated = parsed.filter((i: WishlistItem) => i.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
    }
  };

  const clearWishlist = () => {
    setItems([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
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
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tu lista de favoritos está vacía</h2>
        <p className="text-neutral-600 mb-6">Comienza a agregar productos que te gusten</p>
        <a
          href="/shop"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Ir a Shop
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mis Favoritos ({items.length})</h2>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Limpiar favoritos
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/products/${item.slug}`}
                  className="flex-1 bg-primary-600 text-white py-2 rounded text-center hover:bg-primary-700 transition-colors text-sm"
                >
                  Ver Detalles
                </a>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  title="Remover de favoritos"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
