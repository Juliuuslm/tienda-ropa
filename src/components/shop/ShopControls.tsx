import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface ShopControlsProps {
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onSortChange?: (sort: string) => void;
  productCount?: number;
}

const sortOptions = [
  { value: 'newest', label: 'Más Recientes' },
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'popular', label: 'Más Popular' },
  { value: 'rating', label: 'Mejor Calificado' },
  { value: 'a-z', label: 'Nombre: A a Z' },
];

export const ShopControls: React.FC<ShopControlsProps> = ({
  viewMode = 'grid',
  onViewModeChange,
  onSortChange,
  productCount = 0,
}) => {
  const [currentSort, setCurrentSort] = useState('newest');
  const [currentView, setCurrentView] = useState<'grid' | 'list'>(viewMode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    onSortChange?.(value);
    setIsDropdownOpen(false);
  };

  const handleViewChange = (mode: 'grid' | 'list') => {
    setCurrentView(mode);
    onViewModeChange?.(mode);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Product Count */}
        <div className="text-sm text-neutral-600">
          Mostrando <span className="font-bold text-neutral-900">{productCount}</span> productos
        </div>

        {/* Center: Sort */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-2.5 hover:bg-neutral-100 transition-colors text-sm font-medium text-neutral-700"
            >
              <div className="flex items-center gap-2">
                <Icon icon="ArrowUpDown" size={18} />
                <span className="hidden sm:inline">
                  {sortOptions.find((opt) => opt.value === currentSort)?.label}
                </span>
                <span className="sm:hidden">Ordenar</span>
              </div>
              <Icon
                icon={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'}
                size={18}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-neutral-300 rounded-lg shadow-lg z-50 mt-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg border-b border-neutral-100 last:border-b-0 ${
                      currentSort === option.value
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {currentSort === option.value && (
                      <Icon icon="Check" size={16} color="#ff5252" />
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View Mode Toggles */}
        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-1 bg-neutral-50">
          <button
            onClick={() => handleViewChange('grid')}
            className={`p-2 rounded transition-colors ${
              currentView === 'grid'
                ? 'bg-primary-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Vista en Grid"
          >
            <Icon icon="Grid" size={18} />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={`p-2 rounded transition-colors ${
              currentView === 'list'
                ? 'bg-primary-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Vista en Lista"
          >
            <Icon icon="List" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
