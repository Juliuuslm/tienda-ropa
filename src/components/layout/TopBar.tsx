import React from 'react';
import { Icon } from '@/components/common/Icon';

/**
 * Barra superior del header con información de contacto y utilidades
 */
export const TopBar: React.FC = () => {
  return (
    <div className="hidden md:block bg-neutral-900 text-white text-sm py-3 border-b border-neutral-800">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <a href="mailto:info@tiendaderopa.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Icon icon="Mail" size={16} />
              <span>info@tiendaderopa.com</span>
            </a>
            <a href="tel:+34123456789" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Icon icon="Phone" size={16} />
              <span>+34 123 456 789</span>
            </a>
            <div className="flex items-center gap-2 text-neutral-400">
              <Icon icon="MapPin" size={16} />
              <span>Madrid, España</span>
            </div>
          </div>

          {/* Right: Language & Currency */}
          <div className="flex items-center gap-4">
            <select className="bg-neutral-800 text-white text-xs py-1 px-2 rounded border border-neutral-700 hover:border-primary-500 transition-colors cursor-pointer">
              <option>ES - Español</option>
              <option>EN - English</option>
              <option>FR - Français</option>
            </select>
            <select className="bg-neutral-800 text-white text-xs py-1 px-2 rounded border border-neutral-700 hover:border-primary-500 transition-colors cursor-pointer">
              <option>EUR €</option>
              <option>USD $</option>
              <option>GBP £</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
