import React from 'react';
import { ProductCard } from './ProductCard';

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

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
  title?: string;
  description?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  title = 'Productos Relacionados',
  description,
}) => {
  // Filter out current product and limit to 4 products
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-neutral-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && <p className="text-neutral-600">{description}</p>}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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

      {/* View All Link */}
      <div className="mt-8 text-center">
        <a
          href="/shop"
          className="inline-block text-primary-600 font-semibold hover:underline transition-colors"
        >
          Ver más productos →
        </a>
      </div>
    </section>
  );
};
