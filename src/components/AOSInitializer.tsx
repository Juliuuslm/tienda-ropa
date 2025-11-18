import React, { useEffect } from 'react';
import { initAOS, refreshAOS } from '@/utils/aos';

/**
 * Component que inicializa AOS (Animate On Scroll) en el cliente
 * Debe ser usado en el layout base con client:load
 */
export const AOSInitializer: React.FC = () => {
  useEffect(() => {
    // Inicializar AOS
    initAOS();

    // Refresh AOS cuando el DOM cambia
    const handleDOMChange = () => {
      refreshAOS();
    };

    // Escuchar eventos de cambio
    window.addEventListener('load', handleDOMChange);

    return () => {
      window.removeEventListener('load', handleDOMChange);
    };
  }, []);

  return null; // Este componente solo maneja lógica, no renderiza nada
};
