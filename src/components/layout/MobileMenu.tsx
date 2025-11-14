import React, { useState, useEffect, useRef } from 'react';

interface MenuLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links?: MenuLink[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  links = [
    { label: 'Shop', href: '/shop' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cerrar menú cuando se haga clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded hover:bg-neutral-100 transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 -right-4 bg-white border border-neutral-200 rounded-md shadow-lg md:hidden z-50 min-w-48"
        >
          <nav className="py-4">
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
