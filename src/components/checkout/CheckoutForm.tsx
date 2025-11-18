import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CheckoutFormProps {
  onSubmit?: (data: FormData) => void;
  step?: 'billing' | 'shipping' | 'payment';
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const validateZipCode = (zip: string): boolean => {
  return /^[\d\s\-]{3,}$/.test(zip);
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  step = 'billing',
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched.has(name)) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => new Set([...prev, name]));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = `${name === 'firstName' ? 'Nombre' : 'Apellido'} es requerido`;
        } else if (value.length < 2) {
          newErrors[name] = 'Debe tener al menos 2 caracteres';
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email es requerido';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Teléfono es requerido';
        } else if (!validatePhone(value)) {
          newErrors.phone = 'Teléfono inválido';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'address':
        if (!value.trim()) {
          newErrors.address = 'Dirección es requerida';
        } else if (value.length < 5) {
          newErrors.address = 'Dirección debe ser más específica';
        } else {
          delete newErrors.address;
        }
        break;

      case 'city':
      case 'state':
      case 'country':
        if (!value.trim()) {
          newErrors[name] = `${name === 'city' ? 'Ciudad' : name === 'state' ? 'Provincia' : 'País'} es requerido`;
        } else {
          delete newErrors[name];
        }
        break;

      case 'zipCode':
        if (!value.trim()) {
          newErrors.zipCode = 'Código postal es requerido';
        } else if (!validateZipCode(value)) {
          newErrors.zipCode = 'Código postal inválido';
        } else {
          delete newErrors.zipCode;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'Este campo es requerido';
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (formData.zipCode && !validateZipCode(formData.zipCode)) {
      newErrors.zipCode = 'Código postal inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit?.(formData);
    setIsSubmitting(false);
  };

  const FormField = ({
    label,
    name,
    type = 'text',
    placeholder,
    required = true,
    pattern,
  }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
  }) => {
    const hasError = errors[name];
    const isTouched = touched.has(name);
    const isValid = isTouched && !hasError;

    return (
      <div key={name} className="space-y-2">
        <label className="block font-semibold text-neutral-900 flex items-center gap-1">
          {label}
          {required && <span className="text-primary-600">*</span>}
        </label>

        <div className="relative">
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            pattern={pattern}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none $
              {hasError && isTouched
                ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : isValid
                  ? 'border-green-500 bg-green-50'
                  : 'border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
            }`}
          />

          {isValid && (
            <Icon
              icon="Check"
              size={20}
              color="#22c55e"
              className="absolute right-3 top-3"
            />
          )}
          {hasError && isTouched && (
            <Icon
              icon="AlertCircle"
              size={20}
              color="#ef4444"
              className="absolute right-3 top-3"
            />
          )}
        </div>

        {hasError && isTouched && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <Icon icon="AlertCircle" size={16} color="#ef4444" />
            {hasError}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm p-8 space-y-6"
      data-aos="fade-up"
    >
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          {step === 'billing' && 'Dirección de Facturación'}
          {step === 'shipping' && 'Dirección de Envío'}
          {step === 'payment' && 'Información de Pago'}
        </h3>
        <p className="text-neutral-600">
          {step === 'billing' &&
            'Proporciona la dirección donde facturaremos tu compra'}
          {step === 'shipping' &&
            'Dirección donde entregaremos tu pedido'}
          {step === 'payment' && 'Elige tu método de pago preferido'}
        </p>
      </div>

      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField label="Nombre" name="firstName" placeholder="Juan" />
        <FormField label="Apellido" name="lastName" placeholder="Pérez" />
      </div>

      {/* Email y Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="juan@ejemplo.com"
        />
        <FormField
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="+34 123 456 789"
        />
      </div>

      {/* Dirección */}
      <div className="space-y-2">
        <label className="block font-semibold text-neutral-900">
          Dirección <span className="text-primary-600">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Calle Principal 123"
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none $
            {errors.address && touched.has('address')
              ? 'border-red-500 bg-red-50 focus:border-red-600'
              : touched.has('address') && !errors.address
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
          }`}
        />
        {errors.address && touched.has('address') && (
          <p className="text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {/* Ciudad, Provincia, Código Postal */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField label="Ciudad" name="city" placeholder="Madrid" />
        <FormField label="Provincia" name="state" placeholder="Madrid" />
        <FormField label="Código Postal" name="zipCode" placeholder="28001" />
      </div>

      {/* País */}
      <div className="space-y-2">
        <label className="block font-semibold text-neutral-900">
          País <span className="text-primary-600">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none $
            {errors.country && touched.has('country')
              ? 'border-red-500 bg-red-50'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
          }`}
        >
          <option value="">Selecciona un país</option>
          <option value="Spain">España</option>
          <option value="Portugal">Portugal</option>
          <option value="France">Francia</option>
          <option value="Germany">Alemania</option>
          <option value="UK">Reino Unido</option>
        </select>
        {errors.country && touched.has('country') && (
          <p className="text-sm text-red-600">{errors.country}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 $
          {isSubmitting || Object.keys(errors).length > 0
            ? 'bg-neutral-400 cursor-not-allowed opacity-50'
            : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg active:scale-95'
        }`}
      >
        {isSubmitting && (
          <Icon icon="Loader" size={20} color="white" />
        )}
        {step === 'billing' && 'Continuar al Envío'}
        {step === 'shipping' && 'Continuar al Pago'}
        {step === 'payment' && 'Completar Compra'}
      </button>
    </form>
  );
};
