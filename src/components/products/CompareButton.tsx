import React from 'react';
import { useCompare } from '@/context/CompareContext';

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
  const { toggleItem, isInCompare, count } = useCompare();
  const inCompare = isInCompare(id);
  const isFull = count >= 4 && !inCompare;

  const handleToggleCompare = () => {
    if (!isFull) {
      toggleItem({
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
