import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  alt?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  alt,
}) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const mainImage = images[mainImageIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleThumbnailClick = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container with Zoom */}
      <div
        className="relative bg-neutral-100 aspect-square rounded-lg overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={mainImage}
          alt={alt || productName}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
          loading="lazy"
        />

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
            🔍 Zoom
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
            {mainImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                mainImageIndex === index
                  ? 'border-primary-600 ring-2 ring-primary-300'
                  : 'border-neutral-300 hover:border-primary-400'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={mainImageIndex === index}
            >
              <img
                src={image}
                alt={`${productName} - imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Keyboard Navigation Info */}
      {images.length > 1 && (
        <div className="text-center text-xs text-neutral-500">
          Haz clic en las miniaturas para cambiar de imagen
        </div>
      )}
    </div>
  );
};
