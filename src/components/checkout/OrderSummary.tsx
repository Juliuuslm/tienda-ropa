import React from 'react';
import { Icon } from '@/components/common/Icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderSummaryProps {
  items?: CartItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  promoCode = '',
  onApplyPromo,
}) => {
  const total = subtotal + shipping + tax - discount;

  // Demo items if none provided
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: '1',
            name: 'Vestido Elegante Negro',
            price: 89.99,
            quantity: 1,
          },
          {
            id: '2',
            name: 'Zapatillas Deportivas Blancas',
            price: 59.99,
            quantity: 2,
          },
        ];

  const displaySubtotal =
    subtotal || displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const displayShipping = shipping || 9.99;
  const displayTax = tax || displaySubtotal * 0.1;

  const [promoInput, setPromoInput] = React.useState(promoCode);

  return (
    <div
      className="bg-neutral-50 rounded-xl shadow-sm p-8 h-fit sticky top-24"
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-1">
          Resumen de Orden
        </h3>
        <p className="text-sm text-neutral-600">
          {displayItems.length} artículo{displayItems.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Cart Items */}
      <div className="mb-8 pb-8 border-b border-neutral-200 space-y-4 max-h-64 overflow-y-auto">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 bg-white rounded-lg hover:shadow-sm transition-all group"
          >
            {/* Image Placeholder */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                <Icon icon="ShoppingBag" size={20} color="#ff5252" />
              </div>
            )}

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-neutral-900 truncate">
                {item.name}
              </h4>
              <p className="text-xs text-neutral-600 mt-1">
                Cantidad: {item.quantity}
              </p>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-neutral-900">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-neutral-500">€{item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-8 pb-8 border-b border-neutral-200 space-y-3">
        <h4 className="text-sm font-semibold text-neutral-900">Código Promocional</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
            placeholder="Ingresa tu código"
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />
          <button
            onClick={() => onApplyPromo?.(promoInput)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-all active:scale-95"
          >
            Aplicar
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-8 pb-8 border-b border-neutral-200">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Subtotal:</span>
          <span className="font-semibold text-neutral-900">
            €{displaySubtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-neutral-700">Envío:</span>
            <Icon
              icon="Truck"
              size={16}
              color="#6b7280"
              className="opacity-75"
            />
          </div>
          <span className="font-semibold text-neutral-900">
            €{displayShipping.toFixed(2)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Impuestos (IVA):</span>
          <span className="font-semibold text-neutral-900">
            €{displayTax.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-700 font-semibold">Descuento:</span>
            <span className="font-bold text-green-700">
              -€{discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="mb-8 p-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white">
        <div className="flex justify-between items-baseline gap-4">
          <span className="text-lg">Total a Pagar:</span>
          <span className="text-4xl font-black">€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3">
        {/* Secure Payment */}
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Icon icon="Lock" size={16} color="#6b7280" />
          <span>Pago 100% seguro y encriptado</span>
        </div>

        {/* Money Back */}
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Icon icon="RotateCcw" size={16} color="#6b7280" />
          <span>Devoluciones gratis en 30 días</span>
        </div>

        {/* Support */}
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Icon icon="Headphones" size={16} color="#6b7280" />
          <span>Soporte 24/7 disponible</span>
        </div>
      </div>

      {/* Collapse on Mobile Hint */}
      <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg text-center">
        <p className="text-xs text-primary-700 font-semibold">
          Este resumen se actualiza con tu carrito
        </p>
      </div>
    </div>
  );
};
