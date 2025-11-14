import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 12,
  totalItems,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to show (max 7 pages)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage - halfWindow < 1) {
      endPage = Math.min(totalPages, endPage + (halfWindow - (currentPage - 1)));
    }
    if (currentPage + halfWindow > totalPages) {
      startPage = Math.max(1, startPage - (currentPage + halfWindow - totalPages));
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      {/* Page Info */}
      {totalItems && (
        <p className="text-neutral-600 text-sm">
          Mostrando página {currentPage} de {totalPages}
          {totalItems && ` (${totalItems} productos totales)`}
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-4 py-2 text-neutral-600">
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page as number)}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                isCurrentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 hover:bg-neutral-100'
              }`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
