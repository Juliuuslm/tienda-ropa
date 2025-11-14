import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ShopFiltersAndSort, type SortOption } from './ShopFiltersAndSort';
import { Pagination } from './Pagination';

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

  return (
    <div>
      {/* Filters and Sort */}
      <ShopFiltersAndSort
        totalProducts={filteredAndSortedProducts.length}
        onSortChange={setSortBy}
        onSearchChange={setSearchQuery}
        currentSort={sortBy}
        categories={categories}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Product Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedProducts.length}
          />
        </>
      ) : (
        <div className="text-center py-16">
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
  );
};
