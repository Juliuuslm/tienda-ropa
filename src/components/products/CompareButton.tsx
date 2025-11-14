import React, { useState, useEffect } from 'react';

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

interface CompareButtonProps {
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
  className?: string;
}

export const CompareButton: React.FC<CompareButtonProps> = ({
  id,
  slug,
  name,
  price,
  salePrice,
  image,
  category,
  rating,
  stock,
  colors,
  sizes,
  className = '',
}) => {
  const [inCompare, setInCompare] = useState(false);
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('compare');
    const items: CompareItem[] = saved ? JSON.parse(saved) : [];
    setCount(items.length);
    setInCompare(items.some((item) => item.id === id));
  }, [id]);

  const isFull = count >= 4 && !inCompare;

  const handleToggleCompare = () => {
    if (!isFull) {
      const saved = localStorage.getItem('compare');
      const items: CompareItem[] = saved ? JSON.parse(saved) : [];

      const existingIndex = items.findIndex((item) => item.id === id);
      if (existingIndex >= 0) {
        items.splice(existingIndex, 1);
        setInCompare(false);
      } else {
        items.push({
          id,
          slug,
          name,
          price,
          salePrice,
          image,
          category,
          rating,
          stock,
          colors,
          sizes,
        });
        setInCompare(true);
      }

      setCount(items.length);
      localStorage.setItem('compare', JSON.stringify(items));
    }
  };

  return (
    <button
      onClick={handleToggleCompare}
      disabled={isFull}
      className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
        inCompare
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : isFull
          ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
      } ${className}`}
      title={isFull ? 'Máximo 4 productos para comparar' : 'Agregar a comparación'}
    >
      {inCompare ? '✓ En Comparación' : '⚖ Comparar'}
    </button>
  );
};
