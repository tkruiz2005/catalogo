
import React from 'react';
import { WifiOffIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-rose-50 border-2 border-dashed border-rose-200 rounded-2xl">
        <WifiOffIcon className="w-16 h-16 text-rose-400 mb-4" />
        <h3 className="text-xl font-bold text-rose-800 mb-2">Oops! Algo salió mal.</h3>
        <p className="text-rose-700">{message}</p>
        <p className="text-sm text-rose-600 mt-2">Por favor, intente recargar la página más tarde.</p>
    </div>
  );
};