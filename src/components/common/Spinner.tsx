import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'secondary' | 'white';

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const variantClasses: Record<SpinnerVariant, string> = {
  primary: 'border-primary-600 border-t-transparent',
  secondary: 'border-neutral-400 border-t-neutral-700',
  white: 'border-white border-t-white/40',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
  label = 'Cargando...',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Spinner */}
      <div
        className={`${sizeClasses[size]} rounded-full border-4 animate-spin ${variantClasses[variant]}`}
        role="status"
        aria-live="polite"
      />

      {/* Loading Text */}
      {label && (
        <p className="text-sm font-medium text-neutral-600">{label}</p>
      )}
    </div>
  );
};

/**
 * Spinner Overlay - Full screen loading indicator
 */
interface SpinnerOverlayProps {
  show: boolean;
  message?: string;
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({
  show,
  message = 'Cargando...',
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 shadow-xl">
        <Spinner size="lg" variant="primary" label={message} />
      </div>
    </div>
  );
};

/**
 * Inline Spinner - For loading states within content
 */
interface InlineSpinnerProps {
  text?: string;
}

export const InlineSpinner: React.FC<InlineSpinnerProps> = ({
  text = 'Cargando contenido...',
}) => {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="w-5 h-5 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      <span className="text-neutral-600 text-sm">{text}</span>
    </div>
  );
};
