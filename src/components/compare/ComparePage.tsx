import React, { useEffect, useState } from 'react';

interface CompareItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating?: number;
  stock?: number;
  colors?: string[];
  sizes?: string[];
}

export const ComparePage: React.FC = () => {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('compare');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading compare:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const saved = localStorage.getItem('compare');
    if (saved) {
      const parsed = JSON.parse(saved);
      const updated = parsed.filter((i: CompareItem) => i.id !== id);
      localStorage.setItem('compare', JSON.stringify(updated));
    }
  };

  const clearCompare = () => {
    setItems([]);
    localStorage.setItem('compare', JSON.stringify([]));
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
          <path d="M3 21v-4a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v4"></path>
          <circle cx="9" cy="9" r="4"></circle>
          <circle cx="19" cy="9" r="4"></circle>
        </svg>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          No hay productos para comparar
        </h2>
        <p className="text-neutral-600 mb-6">Agrega hasta 4 productos para compararlos</p>
        <a
          href="/shop"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Ir a Shop
        </a>
      </div>
    );
  }

  const attributes = [
    { key: 'price', label: 'Precio' },
    { key: 'salePrice', label: 'Precio en Oferta' },
    { key: 'rating', label: 'Calificación' },
    { key: 'stock', label: 'Stock Disponible' },
    { key: 'category', label: 'Categoría' },
    { key: 'colors', label: 'Colores' },
    { key: 'sizes', label: 'Tallas' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Comparar Productos ({items.length}/4)</h2>
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Limpiar comparación
          </button>
        )}
      </div>

      {/* Product Cards Header */}
      <div className="overflow-x-auto mb-6">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 line-clamp-2">
                  {item.name}
                </h3>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr.key} className="border-b">
                <td className="bg-neutral-50 p-4 font-semibold text-neutral-900 w-48 sticky left-0 z-10">
                  {attr.label}
                </td>
                {items.map((item) => {
                  let value: any = item[attr.key as keyof typeof item];

                  if (attr.key === 'price' || attr.key === 'salePrice') {
                    value = value ? `$${value.toFixed(2)}` : 'N/A';
                  } else if (attr.key === 'rating') {
                    value = value ? `${value} ★` : 'Sin calificación';
                  } else if (attr.key === 'colors' || attr.key === 'sizes') {
                    value = Array.isArray(value) ? value.join(', ') : 'N/A';
                  } else if (value === undefined || value === null) {
                    value = 'N/A';
                  }

                  return (
                    <td key={item.id} className="p-4 text-center border-l">
                      <span className="text-neutral-900">{String(value)}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Action Row */}
            <tr>
              <td className="bg-neutral-50 p-4 font-semibold text-neutral-900 w-48 sticky left-0 z-10">
                Acciones
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4 text-center border-l">
                  <a
                    href={`/products/${item.slug}`}
                    className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-sm"
                  >
                    Ver Detalles
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
