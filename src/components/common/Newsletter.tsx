import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingresa un email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    // Here you would typically send the email to your backend
    console.log('Newsletter subscription:', email);
    setSubmitted(true);
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Suscribirse a Nuestro Newsletter</h2>
          <p className="text-primary-100">
            Recibe las mejores ofertas, tendencias y novedades directamente en tu email
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg text-center">
            <p className="font-semibold">¡Gracias por suscribirse!</p>
            <p className="text-sm mt-1">Revisa tu email para confirmar la suscripción</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded hover:bg-primary-50 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        )}

        {error && <p className="text-red-200 text-sm mt-3">{error}</p>}
      </div>
    </section>
  );
};
