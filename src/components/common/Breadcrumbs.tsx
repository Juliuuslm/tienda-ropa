import React from 'react';
import { Icon } from '@/components/common/Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label="Breadcrumbs"
      data-aos="fade-down"
    >
      {/* Home Link */}
      <a
        href="/"
        className="text-neutral-600 hover:text-primary-600 transition-colors flex items-center gap-1.5 font-medium"
      >
        <Icon icon="Home" size={16} />
        Inicio
      </a>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {/* Separator */}
          <span className="text-neutral-400">
            <Icon icon="ChevronRight" size={16} />
          </span>

          {/* Item */}
          {item.href ? (
            <a
              href={item.href}
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </a>
          ) : (
            <span
              className="text-neutral-900 font-semibold"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
