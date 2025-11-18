import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface IconProps {
  icon: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

/**
 * Componente reutilizable para iconos de Lucide React
 * Uso:
 * <Icon icon="Heart" size={24} color="red" />
 * <Icon icon="ShoppingCart" size={20} className="text-primary-600" />
 */
export const Icon: React.FC<IconProps> = ({
  icon,
  size = 24,
  color,
  className = '',
  strokeWidth = 2,
}) => {
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ComponentType<any>;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in lucide-react`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};

// Aliases comunes para facilitar el uso
export const icons = {
  heart: 'Heart',
  heartFill: 'Heart',
  cart: 'ShoppingCart',
  menu: 'Menu',
  x: 'X',
  search: 'Search',
  user: 'User',
  mapPin: 'MapPin',
  mail: 'Mail',
  phone: 'Phone',
  star: 'Star',
  starFill: 'Star',
  truck: 'Truck',
  shield: 'Shield',
  check: 'CheckCircle',
  eye: 'Eye',
  eyeOff: 'EyeOff',
  filter: 'Filter',
  sort: 'ArrowUpDown',
  plus: 'Plus',
  minus: 'Minus',
  trash: 'Trash2',
  edit: 'Edit',
  share: 'Share2',
  scale: 'BarChart3',
  creditCard: 'CreditCard',
  lock: 'Lock',
  alertCircle: 'AlertCircle',
  chevronDown: 'ChevronDown',
  chevronUp: 'ChevronUp',
  chevronLeft: 'ChevronLeft',
  chevronRight: 'ChevronRight',
  arrowRight: 'ArrowRight',
  arrowLeft: 'ArrowLeft',
  externalLink: 'ExternalLink',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  linkedin: 'Linkedin',
  calendar: 'Calendar',
  clock: 'Clock',
  package: 'Package',
  zap: 'Zap',
  loader: 'Loader2',
  grid: 'Grid',
  list: 'List',
  image: 'Image',
} as const;
