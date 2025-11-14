import React, { useState } from 'react';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';

interface ShopFiltersAndSortProps {
  totalProducts: number;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (query: string) => void;
  currentSort?: SortOption;
  categories?: string[];
  onCategoryChange?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export const ShopFiltersAndSort: React.FC<ShopFiltersAndSortProps> = ({
  totalProducts,
  onSortChange,
  onSearchChange,
  currentSort = 'newest',
  categories = [],
  onCategoryChange,
  selectedCategory,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleCategoryClick = (category: string | null) => {
    onCategoryChange?.(category);
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Product Count */}
        <p className="text-neutral-600">
          {totalProducts === 0
            ? 'No hay productos'
            : `Mostrando ${totalProducts} ${totalProducts === 1 ? 'producto' : 'productos'}`}
        </p>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-neutral-600 font-semibold text-sm">
            Ordenar por:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={handleSortChange}
            className="border border-neutral-300 rounded px-4 py-2 bg-white cursor-pointer hover:border-primary-600 transition-colors"
          >
            <option value="newest">Más nuevo</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="popular">Más popular</option>
            <option value="rating">Mejor calificado</option>
          </select>
        </div>
      </div>

      {/* Search Bar (Optional) */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 transition-colors flex items-center gap-2"
          aria-label="Toggle filters"
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
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtros
        </button>
      </div>

      {/* Category Filters (Desktop) */}
      {categories.length > 0 && (
        <div className="hidden md:block">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 text-neutral-700 hover:border-primary-600'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'border border-neutral-300 text-neutral-700 hover:border-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Filters (Mobile) */}
      {categories.length > 0 && isFilterOpen && (
        <div className="md:hidden border-t pt-4">
          <h4 className="font-semibold mb-3 text-neutral-900">Categorías</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full text-left px-4 py-2 rounded text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-neutral-100'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left px-4 py-2 rounded text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
