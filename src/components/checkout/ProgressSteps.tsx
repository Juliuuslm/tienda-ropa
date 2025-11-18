import React from 'react';
import { Icon } from '@/components/common/Icon';

export type CheckoutStep = 'billing' | 'shipping' | 'payment';

interface ProgressStepsProps {
  currentStep: CheckoutStep;
  completedSteps?: CheckoutStep[];
}

interface Step {
  id: CheckoutStep;
  num: number;
  label: string;
  icon: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'billing',
    num: 1,
    label: 'Facturación',
    icon: 'MapPin',
    description: 'Dirección de entrega',
  },
  {
    id: 'shipping',
    num: 2,
    label: 'Envío',
    icon: 'Truck',
    description: 'Método de envío',
  },
  {
    id: 'payment',
    num: 3,
    label: 'Pago',
    icon: 'CreditCard',
    description: 'Información de pago',
  },
];

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  completedSteps = [],
}) => {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-12" data-aos="fade-up">
      <div className="space-y-8">
        {/* Desktop View - Horizontal */}
        <div className="hidden md:flex justify-between relative">
          {/* Connection Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-neutral-200 z-0" />
          <div
            className="absolute top-6 left-0 h-1 bg-primary-600 z-0 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = step.id === currentStep;
            const isPast = index < currentStepIndex;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10 flex-1"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {/* Step Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold mb-3 transition-all duration-300 shadow-md $
                    {isCompleted || isPast
                      ? 'bg-primary-600 text-white scale-105'
                      : isActive
                        ? 'bg-primary-600 text-white ring-4 ring-primary-200 scale-105'
                        : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {isCompleted || isPast ? (
                    <Icon icon="Check" size={24} />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="text-center">
                  <h3
                    className={`font-bold transition-colors $
                      {isActive || isPast
                        ? 'text-neutral-900'
                        : 'text-neutral-600'
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View - Vertical */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = step.id === currentStep;
            const isPast = index < currentStepIndex;

            return (
              <div
                key={step.id}
                className="flex gap-4 relative"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-7 top-14 w-1 h-8 transition-colors $
                      {isCompleted || isPast
                        ? 'bg-primary-600'
                        : 'bg-neutral-200'
                    }`}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-all duration-300 shadow-md $
                    {isCompleted || isPast
                      ? 'bg-primary-600 text-white'
                      : isActive
                        ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                        : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {isCompleted || isPast ? (
                    <Icon icon="Check" size={20} />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="pt-2">
                  <h3
                    className={`font-bold transition-colors $
                      {isActive || isPast
                        ? 'text-neutral-900'
                        : 'text-neutral-600'
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
