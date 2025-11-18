import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/common/Icon';

interface Category {
  id: string;
  name: string;
  href: string;
}

const categories: Category[] = [
  { id: '1', name: 'Todos los productos', href: '/shop' },
  { id: '2', name: 'Vestidos', href: '/shop?category=vestidos' },
  { id: '3', name: 'Camisetas', href: '/shop?category=camisetas' },
  { id: '4', name: 'Pantalones', href: '/shop?category=pantalones' },
  { id: '5', name: 'Chaquetas', href: '/shop?category=chaquetas' },
  { id: '6', name: 'Accesorios', href: '/shop?category=accesorios' },
];

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          {/* Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="hidden sm:flex items-center gap-2 bg-neutral-100 text-neutral-700 px-4 py-2.5 border border-r-0 border-neutral-300 rounded-l-lg hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              <Icon icon="Filter" size={18} />
              <span className="text-sm font-medium">Categorías</span>
              <Icon icon={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 w-48 bg-white border border-neutral-300 rounded-b-lg shadow-lg z-50 mt-0">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={category.href}
                    className="block px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-neutral-100 last:border-b-0"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 px-4 py-2.5 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm hidden sm:block"
          />

          {/* Mobile Search Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 px-4 py-2.5 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:hidden"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2.5 rounded-r-lg hover:bg-primary-700 transition-colors flex items-center gap-2 border-l border-neutral-300"
          >
            <Icon icon="Search" size={18} />
            <span className="hidden sm:inline text-sm font-medium">Buscar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
