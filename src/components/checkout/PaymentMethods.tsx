import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

export type PaymentMethod = 'card' | 'paypal' | 'transfer' | 'crypto';

interface PaymentMethodsProps {
  onSelect?: (method: PaymentMethod) => void;
  selectedMethod?: PaymentMethod;
}

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'card',
    name: 'Tarjeta de Crédito',
    description: 'Visa, Mastercard, Amex',
    icon: 'CreditCard',
    color: '#4338ca',
    gradient: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pago seguro con PayPal',
    icon: 'Zap',
    color: '#0070ba',
    gradient: 'linear-gradient(135deg, #0070ba 0%, #003087 100%)',
  },
  {
    id: 'transfer',
    name: 'Transferencia Bancaria',
    description: 'Transferencia directa a banco',
    icon: 'DollarSign',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  },
  {
    id: 'crypto',
    name: 'Criptomonedas',
    description: 'Bitcoin, Ethereum y más',
    icon: 'TrendingUp',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
];

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  onSelect,
  selectedMethod = 'card',
}) => {
  const [selected, setSelected] = useState<PaymentMethod>(selectedMethod);

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method);
    onSelect?.(method);
  };

  return (
    <div className="space-y-6" data-aos="fade-up">
      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-4">
          Método de Pago
        </h3>
        <p className="text-sm text-neutral-600 mb-6">
          Selecciona cómo deseas pagar tu compra
        </p>
      </div>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 text-white group $
              {selected === option.id
                ? 'ring-2 ring-offset-2 ring-primary-600 shadow-lg scale-105'
                : 'shadow-md hover:shadow-lg hover:scale-102'
            }`}
            style={{
              background: option.gradient,
            }}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

            {/* Icon */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Icon icon={option.icon as any} size={24} color="white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <h4 className="font-bold text-sm">{option.name}</h4>
                <p className="text-xs text-white/80 mt-1">
                  {option.description}
                </p>
              </div>

              {/* Checkmark */}
              {selected === option.id && (
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                    <Icon icon="Check" size={16} color="white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon
            icon="Info"
            size={20}
            color="#ff5252"
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="font-semibold text-sm text-primary-900 mb-1">
              Seguridad Garantizada
            </h4>
            <p className="text-xs text-primary-700">
              Todos tus pagos están protegidos con encriptación SSL 256-bit de
              nivel bancario. Tu información de pago nunca se comparte con
              terceros.
            </p>
          </div>
        </div>
      </div>

      {/* Card Form (shown when card is selected) */}
      {selected === 'card' && (
        <div className="space-y-4 mt-6" data-aos="fade-up">
          <h4 className="font-bold text-neutral-900">Detalles de la Tarjeta</h4>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Número de Tarjeta
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Vencimiento
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                maxLength={4}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Nombre del Titular
            </label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};
