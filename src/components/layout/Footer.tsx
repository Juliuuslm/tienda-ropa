import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const sections: FooterSection[] = [
    {
      title: 'Categorías',
      links: [
        { label: 'Vestidos', href: '/shop?category=vestidos' },
        { label: 'Camisetas', href: '/shop?category=camisetas' },
        { label: 'Pantalones', href: '/shop?category=pantalones' },
        { label: 'Chaquetas', href: '/shop?category=chaquetas' },
        { label: 'Accesorios', href: '/shop?category=accesorios' },
        { label: 'Zapatos', href: '/shop?category=zapatos' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contacto', href: '/contact' },
        { label: 'Carrera', href: '#' },
        { label: 'Prensa', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Centro de Ayuda', href: '#' },
        { label: 'Envíos', href: '#' },
        { label: 'Devoluciones', href: '#' },
        { label: 'Políticas', href: '#' },
        { label: 'Términos de Servicio', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter Section */}
      <div
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
        data-aos="fade-up"
      >
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold mb-2">Suscríbete a Nuestro Newsletter</h3>
              <p className="text-white/80">
                Recibe ofertas exclusivas, tips de moda y noticias sobre nuevas colecciones directamente en tu inbox.
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-neutral-100 transition-all active:scale-95"
              >
                Suscribir
              </button>
            </form>

            {/* Success Message */}
            {subscribed && (
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-white bg-green-600/30 border border-green-400/50 rounded-lg p-4">
                <Icon icon="Check" size={20} color="white" />
                ¡Gracias! Te hemos enviado un email de confirmación.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16 border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div data-aos="fade-up" data-aos-delay="0">
            <h2 className="text-2xl font-bold text-white mb-4">Nova</h2>
            <p className="text-neutral-400 text-sm mb-6">
              Ropa moderna y vibrante para tu estilo de vida. Descubre las últimas tendencias en moda femenina.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: 'Facebook', href: '#' },
                { icon: 'Instagram', href: '#' },
                { icon: 'Twitter', href: '#' },
                { icon: 'Linkedin', href: '#' },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-all group"
                  aria-label={social.icon}
                >
                  <Icon
                    icon={social.icon as any}
                    size={18}
                    color="#9ca3af"
                    className="group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div
              key={section.title}
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <h4 className="font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-neutral-500 text-sm">
              © 2024 Nova Fashion. Todos los derechos reservados.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <span className="text-neutral-500 text-sm">Métodos de pago:</span>
            <div className="flex gap-3">
              {[
                { icon: 'CreditCard', label: 'Tarjeta' },
                { icon: 'Zap', label: 'PayPal' },
                { icon: 'DollarSign', label: 'Transferencia' },
              ].map((method) => (
                <div
                  key={method.label}
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  title={method.label}
                >
                  <Icon
                    icon={method.icon as any}
                    size={18}
                    color="#9ca3af"
                    className="group-hover:text-white transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-neutral-800 py-6 border-t border-neutral-700">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: 'Lock', text: 'Pago Seguro 256-bit SSL' },
              { icon: 'Truck', text: 'Envío Gratis a partir de €50' },
              { icon: 'RotateCcw', text: 'Devoluciones Gratis 30 días' },
              { icon: 'Headphones', text: 'Soporte 24/7' },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-neutral-400 text-sm"
                data-aos="zoom-in"
              >
                <Icon icon={badge.icon as any} size={20} color="#ff5252" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
