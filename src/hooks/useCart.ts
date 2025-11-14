import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

const CART_STORAGE_KEY = 'cart';
const CART_UPDATE_EVENT = 'cartUpdated';

// Función para disparar el evento de actualización del carrito
export function dispatchCartUpdate(items: CartItem[]) {
  window.dispatchEvent(
    new CustomEvent(CART_UPDATE_EVENT, { detail: { items } })
  );
}

// Hook para usar el carrito con sincronización automática
export function useCartSync() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar carrito desde localStorage
  const loadCart = useCallback(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Escuchar cambios en localStorage y eventos personalizados
  useEffect(() => {
    loadCart();

    // Escuchar evento personalizado de actualización del carrito
    const handleCartUpdate = (event: CustomEvent) => {
      setItems(event.detail.items);
    };

    // Escuchar cambios en localStorage desde otras pestañas
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY && event.newValue) {
        try {
          setItems(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Error parsing cart from storage:', error);
        }
      }
    };

    window.addEventListener(
      CART_UPDATE_EVENT as any,
      handleCartUpdate as EventListener
    );
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(
        CART_UPDATE_EVENT as any,
        handleCartUpdate as EventListener
      );
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCart]);

  return { items, isLoading };
}
