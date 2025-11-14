import React, { useState } from 'react';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
}

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 500],
    ratings: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Vestidos', 'Blusas', 'Pantalones', 'Chaquetas', 'Faldas', 'Suéteres'];

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: number) => {
    const newFilters = { ...filters, priceRange: [0, value] };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];

    const newFilters = { ...filters, ratings: newRatings };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      categories: [],
      priceRange: [0, 500],
      ratings: [],
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between mb-4 pb-4 border-b"
      >
        <span className="font-semibold">Filtros</span>
        <span>{isOpen ? '✕' : '☰'}</span>
      </button>

      {/* Filters Container */}
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Categorías</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded"
                />
                <span className="text-neutral-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Rango de Precio</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>$0</span>
              <span className="font-semibold">${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Calificación</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className="rounded"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-neutral-300'}>
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-neutral-600">({rating}+)</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full py-2 bg-neutral-200 text-neutral-900 rounded hover:bg-neutral-300 transition-colors font-semibold"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};
