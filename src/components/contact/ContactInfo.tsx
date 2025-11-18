import React from 'react';
import { Icon } from '@/components/common/Icon';
import type { IconProps } from '@/components/common/Icon';

export interface ContactInfoProps {
  icon: IconProps['icon'];
  title: string;
  content: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="text-center hover-lift p-6 rounded-xl transition-all duration-200">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center">
          <Icon icon={icon} size={28} color="#2ebbac" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-neutral-900">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{content}</p>
    </div>
  );
};
