import React from 'react';
import { Icon } from '@/components/common/Icon';
import type { IconProps } from '@/components/common/Icon';

export interface ValueCardProps {
  icon: IconProps['icon'];
  title: string;
  description: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-8 text-center hover-lift border border-neutral-200">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
          <Icon icon={icon} size={32} color="#ff5252" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-neutral-900">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
};
