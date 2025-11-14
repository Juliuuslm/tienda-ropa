import React, { useEffect, useState } from 'react';

interface Counts {
  wishlist: number;
  compare: number;
}

export const NavLinks: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({ wishlist: 0, compare: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const wishlist = localStorage.getItem('wishlist');
      const compare = localStorage.getItem('compare');

      setCounts({
        wishlist: wishlist ? JSON.parse(wishlist).length : 0,
        compare: compare ? JSON.parse(compare).length : 0,
      });
    } catch (error) {
      console.error('Error loading counts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex gap-4 items-center">
        <a href="/wishlist" className="px-3 py-2 text-sm hover:text-primary-600">
          🤍 Favoritos
        </a>
        <a href="/compare" className="px-3 py-2 text-sm hover:text-primary-600">
          ⚖ Comparar
        </a>
      </div>
    );
  }

  const { wishlist: wishlistCount, compare: compareCount } = counts;

  return (
    <div className="flex gap-4 items-center">
      <a
        href="/wishlist"
        className="relative px-3 py-2 text-sm hover:text-primary-600 transition-colors"
        title="Mis Favoritos"
      >
        🤍 Favoritos
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {wishlistCount}
          </span>
        )}
      </a>
      <a
        href="/compare"
        className="relative px-3 py-2 text-sm hover:text-primary-600 transition-colors"
        title="Comparar Productos"
      >
        ⚖ Comparar
        {compareCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {compareCount}
          </span>
        )}
      </a>
    </div>
  );
};
