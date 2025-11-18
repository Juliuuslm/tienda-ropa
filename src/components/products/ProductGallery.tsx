import React, { useEffect, useState } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Icon } from '@/components/common/Icon';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpened, setLightboxOpened] = useState(false);

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.on('beforeOpen', () => setLightboxOpened(true));
    lightbox.on('close', () => setLightboxOpened(false));
    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="bg-neutral-100 rounded-lg aspect-square flex items-center justify-center">
        <p className="text-neutral-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative bg-neutral-100 rounded-lg overflow-hidden aspect-square group cursor-zoom-in"
        onClick={() => {
          const link = document.querySelector(
            `#gallery a[data-index="${selectedIndex}"]`
          ) as HTMLAnchorElement;
          link?.click();
        }}
      >
        <img
          src={images[selectedIndex]}
          alt={`${productName} - Imagen ${selectedIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Zoom Icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Icon icon="Maximize2" size={24} color="#ff5252" />
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg z-10"
              aria-label="Imagen anterior"
            >
              <Icon icon="ChevronLeft" size={20} color="#1f2937" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg z-10"
              aria-label="Siguiente imagen"
            >
              <Icon icon="ChevronRight" size={20} color="#1f2937" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2" id="gallery">
          {images.map((image, index) => (
            <div key={index}>
              {/* Lightbox Link (hidden) */}
              <a
                href={image}
                data-pswp-width="1024"
                data-pswp-height="1024"
                data-index={index}
                className="hidden"
              >
                {productName}
              </a>

              {/* Thumbnail */}
              <button
                onClick={() => setSelectedIndex(index)}
                className={`relative rounded-lg overflow-hidden aspect-square transition-all duration-300 ${
                  selectedIndex === index
                    ? 'ring-2 ring-primary-600 shadow-lg'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image Details */}
      <div className="text-xs text-neutral-600">
        <p>
          Haz clic en la imagen para ampliar. Usa las flechas para navegar.
        </p>
      </div>
    </div>
  );
};
