import React from 'react';
import { Icon } from '@/components/common/Icon';

interface Category {
  id: string;
  name: string;
  href: string;
  icon: string;
  image: string;
}

interface CategoriesShowcaseProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Vestidos',
    href: '/shop?category=vestidos',
    icon: 'Sparkles',
    image: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
  },
  {
    id: '2',
    name: 'Camisetas',
    href: '/shop?category=camisetas',
    icon: 'ShirtIcon',
    image: 'linear-gradient(135deg, #4ecdc4 0%, #2ebbac 100%)',
  },
  {
    id: '3',
    name: 'Pantalones',
    href: '/shop?category=pantalones',
    icon: 'Package',
    image: 'linear-gradient(135deg, #8338ec 0%, #6c2bd9 100%)',
  },
  {
    id: '4',
    name: 'Chaquetas',
    href: '/shop?category=chaquetas',
    icon: 'Wind',
    image: 'linear-gradient(135deg, #ff006e 0%, #d70055 100%)',
  },
  {
    id: '5',
    name: 'Accesorios',
    href: '/shop?category=accesorios',
    icon: 'Zap',
    image: 'linear-gradient(135deg, #ffed00 0%, #ffc700 100%)',
  },
  {
    id: '6',
    name: 'Zapatos',
    href: '/shop?category=zapatos',
    icon: 'Zap',
    image: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
  },
];

export const CategoriesShowcase: React.FC<CategoriesShowcaseProps> = ({
  categories = defaultCategories,
}) => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
            Explora por Categoría
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de prendas organizadas por categorías
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl h-64 sm:h-72 cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: category.image }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-all duration-300 group-hover:scale-110">
                <div className="mb-4 text-6xl transform group-hover:scale-125 transition-transform duration-300">
                  <Icon icon={category.icon as any} size={64} color="white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  Ver colección →
                </p>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-2xl transition-all duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
