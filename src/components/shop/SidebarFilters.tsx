import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface SidebarFiltersProps {
  onFilterChange?: (filters: Record<string, any>) => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: false,
    size: false,
    rating: false,
  });

  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    rating: null as number | null,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedFilters.categories.includes(category)
      ? selectedFilters.categories.filter((c) => c !== category)
      : [...selectedFilters.categories, category];

    setSelectedFilters((prev) => ({ ...prev, categories: newCategories }));
    onFilterChange?.({ ...selectedFilters, categories: newCategories });
  };

  const handleColorChange = (color: string) => {
    const newColors = selectedFilters.colors.includes(color)
      ? selectedFilters.colors.filter((c) => c !== color)
      : [...selectedFilters.colors, color];

    setSelectedFilters((prev) => ({ ...prev, colors: newColors }));
  };

  const handleSizeChange = (size: string) => {
    const newSizes = selectedFilters.sizes.includes(size)
      ? selectedFilters.sizes.filter((s) => s !== size)
      : [...selectedFilters.sizes, size];

    setSelectedFilters((prev) => ({ ...prev, sizes: newSizes }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      colors: [],
      sizes: [],
      rating: null,
    });
    setPriceRange({ min: 0, max: 200 });
    onFilterChange?.({
      categories: [],
      colors: [],
      sizes: [],
      rating: null,
      price: { min: 0, max: 200 },
    });
  };

  const categories: FilterOption[] = [
    { id: '1', label: 'Vestidos', count: 24 },
    { id: '2', label: 'Camisetas', count: 18 },
    { id: '3', label: 'Pantalones', count: 32 },
    { id: '4', label: 'Chaquetas', count: 15 },
    { id: '5', label: 'Faldas', count: 12 },
  ];

  const colors = [
    { id: 'black', label: 'Negro', color: '#000000' },
    { id: 'white', label: 'Blanco', color: '#FFFFFF' },
    { id: 'red', label: 'Rojo', color: '#FF5252' },
    { id: 'blue', label: 'Azul', color: '#2ebbac' },
    { id: 'pink', label: 'Rosa', color: '#FF006E' },
    { id: 'green', label: 'Verde', color: '#00D084' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <aside className="w-full lg:w-72 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      {/* Clear All */}
      {(selectedFilters.categories.length > 0 ||
        selectedFilters.colors.length > 0 ||
        selectedFilters.sizes.length > 0 ||
        selectedFilters.rating) && (
        <button
          onClick={clearAllFilters}
          className="w-full mb-6 py-2 text-center text-primary-600 hover:text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium"
        >
          Limpiar Filtros
        </button>
      )}

      {/* Categories */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4 font-bold text-neutral-900"
        >
          <span>Categorías</span>
          <Icon
            icon={expandedSections.category ? 'ChevronUp' : 'ChevronDown'}
            size={20}
          />
        </button>

        {expandedSections.category && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(cat.label)}
                  onChange={() => handleCategoryChange(cat.label)}
                  className="w-4 h-4 text-primary-600 rounded cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 flex-1">
                  {cat.label}
                </span>
                <span className="text-xs text-neutral-500">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4 font-bold text-neutral-900"
        >
          <span>Rango de Precio</span>
          <Icon
            icon={expandedSections.price ? 'ChevronUp' : 'ChevronDown'}
            size={20}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-neutral-700">
                Mín: €{priceRange.min}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Math.min(Number(e.target.value), prev.max),
                  }))
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-700">
                Máx: €{priceRange.max}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Math.max(Number(e.target.value), prev.min),
                  }))
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full mb-4 font-bold text-neutral-900"
        >
          <span>Color</span>
          <Icon
            icon={expandedSections.color ? 'ChevronUp' : 'ChevronDown'}
            size={20}
          />
        </button>

        {expandedSections.color && (
          <div className="grid grid-cols-6 gap-3">
            {colors.map((col) => (
              <button
                key={col.id}
                onClick={() => handleColorChange(col.id)}
                title={col.label}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedFilters.colors.includes(col.id)
                    ? 'border-neutral-900 scale-110'
                    : 'border-neutral-300'
                }`}
                style={{ backgroundColor: col.color }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full mb-4 font-bold text-neutral-900"
        >
          <span>Talla</span>
          <Icon
            icon={expandedSections.size ? 'ChevronUp' : 'ChevronDown'}
            size={20}
          />
        </button>

        {expandedSections.size && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilters.sizes.includes(size)
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4 font-bold text-neutral-900"
        >
          <span>Calificación</span>
          <Icon
            icon={expandedSections.rating ? 'ChevronUp' : 'ChevronDown'}
            size={20}
          />
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={selectedFilters.rating === rating}
                  onChange={() =>
                    setSelectedFilters((prev) => ({ ...prev, rating }))
                  }
                  className="cursor-pointer"
                />
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Icon key={i} icon="Star" size={16} color="#ffed00" />
                  ))}
                </div>
                <span className="text-sm text-neutral-700">
                  {rating} Estrellas y arriba
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
