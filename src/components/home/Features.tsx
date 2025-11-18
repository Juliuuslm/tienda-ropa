import React from 'react';
import { Icon } from '@/components/common/Icon';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

interface FeaturesProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Envío Gratis',
    description: 'Envío gratuito en pedidos superiores a €50',
    icon: 'Truck',
    delay: 0,
  },
  {
    id: '2',
    title: 'Devoluciones Fáciles',
    description: '30 días para devolver tus compras sin costo',
    icon: 'RotateCcw',
    delay: 100,
  },
  {
    id: '3',
    title: 'Soporte 24/7',
    description: 'Equipo de atención al cliente siempre disponible',
    icon: 'Headphones',
    delay: 200,
  },
  {
    id: '4',
    title: 'Pago Seguro',
    description: 'Transacciones encriptadas y protegidas',
    icon: 'Lock',
    delay: 300,
  },
];

export const Features: React.FC<FeaturesProps> = ({ features = defaultFeatures }) => {
  return (
    <section className="py-16 bg-white border-t border-neutral-200">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              data-aos="fade-up"
              data-aos-delay={feature.delay}
              className="flex flex-col items-center text-center hover-lift p-6 rounded-xl transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon
                  icon={feature.icon as any}
                  size={40}
                  color="#ff5252"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
