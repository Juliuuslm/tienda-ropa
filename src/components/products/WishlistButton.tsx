import React from 'react';
import { useWishlist } from '@/context/WishlistContext';

interface WishlistButtonProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: 'icon' | 'button';
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  id,
  slug,
  name,
  price,
  image,
  variant = 'icon',
  className = '',
}) => {
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  const handleToggleWishlist = () => {
    toggleItem({
      id,
      slug,
      name,
      price,
      image,
      addedAt: new Date().toISOString(),
    });
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggleWishlist}
        className={`p-2 rounded-full transition-colors duration-200 ${
          inWishlist
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
        } ${className}`}
        title={inWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={inWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
        inWishlist
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
      } ${className}`}
    >
      {inWishlist ? '❤ En Favoritos' : '🤍 Agregar a Favoritos'}
    </button>
  );
};
