import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ShopFiltersAndSort, type SortOption } from './ShopFiltersAndSort';
import { Pagination } from './Pagination';
import { SidebarFilters } from './SidebarFilters';
import { ShopControls } from './ShopControls';
import { ProductCardGridSkeleton } from '@/components/common/Skeleton';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  category?: string;
  stock?: number;
  colors?: string[];
  sizes?: string[];
}

interface ShopPageProps {
  products: Product[];
  itemsPerPage?: number;
}

export const ShopPage: React.FC<ShopPageProps> = ({ products, itemsPerPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category || 'sin-categoria'));
    return Array.from(cats).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => (p.category || 'sin-categoria') === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'popular':
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        // Keep original order (assuming it's sorted by date in the data)
        break;
    }

    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, searchQuery, selectedCategory]);

  const handleSortChange = (sort: string) => {
    setIsLoading(true);
    setSortBy(sort as SortOption);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <div>
      {/* Shop Controls */}
      <ShopControls
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onSortChange={handleSortChange}
        productCount={filteredAndSortedProducts.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters - Desktop Only */}
        <div className="hidden lg:block">
          <SidebarFilters
            onFilterChange={(filters) => {
              if (filters.categories) {
                setSelectedCategory(
                  filters.categories[0] || null
                );
              }
            }}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Product Grid/List */}
          {isLoading ? (
            <ProductCardGridSkeleton count={itemsPerPage} />
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews}
                    stock={product.stock}
                    category={product.category}
                    colors={product.colors}
                    sizes={product.sizes}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredAndSortedProducts.length}
                />
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-neutral-50 rounded-lg">
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No hay productos
              </h3>
              <p className="text-neutral-600">
                Intenta ajustar tus filtros o búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
