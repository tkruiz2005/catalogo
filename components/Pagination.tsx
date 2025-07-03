
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from './Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, onItemsPerPageChange }) => {
  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav aria-label="Pagination" className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
      <div className="flex items-center gap-x-4">
        <p className="text-sm text-gray-700 whitespace-nowrap">
          Mostrando {startItem}-{endItem} de {totalItems}
        </p>
        <div className="relative">
          <label htmlFor="items-per-page" className="sr-only">Registros por página</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supervielle-orange"
          >
            <option value="10">10 / pág.</option>
            <option value="20">20 / pág.</option>
            <option value="50">50 / pág.</option>
            <option value="100">100 / pág.</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          aria-label="Ir a la primera página"
          className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supervielle-orange"
        >
          <span className="sr-only">Primera página</span>
          <ChevronsLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supervielle-orange"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supervielle-orange"
        >
          Siguiente
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          aria-label="Ir a la última página"
          className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supervielle-orange"
        >
           <span className="sr-only">Última página</span>
          <ChevronsRightIcon className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};
