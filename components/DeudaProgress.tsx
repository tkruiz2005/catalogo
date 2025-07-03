import React from 'react';
import { Activo, DeudaDetalle } from '../types';
import { AlertTriangleIcon } from './Icons';

interface DeudaProgressProps {
  deuda: Activo['Deuda'];
}

const isDeudaDetalle = (deuda: any): deuda is DeudaDetalle => {
  return typeof deuda === 'object' && deuda !== null && ('SOA' in deuda || 'DW' in deuda || 'API' in deuda);
};

const ProgressCircle: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 70 70">
        <circle
          className="text-gray-200"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <circle
          className={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
      </svg>
      <span className="absolute text-lg font-bold text-gray-700">{`${Math.round(percentage)}%`}</span>
    </div>
  );
};


export const DeudaProgress: React.FC<DeudaProgressProps> = ({ deuda }) => {
  if (!deuda) {
    return null;
  }
  
  if (!isDeudaDetalle(deuda)) {
    // Fallback for string-based deuda
    if (typeof deuda === 'string' && deuda) {
        return (
             <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <AlertTriangleIcon className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700 text-base">Deuda Tecnica - Datos Mock</p>
                    <p className="text-gray-500 leading-tight">{deuda}</p>
                </div>
            </div>
        )
    }
    return null;
  }

  const { SOA = 0, DW = 0, API = 0 } = deuda;
  const totalDeuda = SOA + DW + API;

  if (totalDeuda === 0) {
    return null;
  }

  const getProgressColor = (value: number) => {
    if (value > 75) return 'text-red-500';
    if (value > 50) return 'text-yellow-500';
    return 'text-green-500';
  }
  
  const colorClass = getProgressColor(totalDeuda);
  
  return (
    <div className="pt-3 border-t border-gray-100">
       <p className="font-medium text-gray-700 mb-2 text-base">Deuda Tecnica - Datos Mock</p>
       <div className="flex items-center gap-4">
           <ProgressCircle percentage={totalDeuda} color={colorClass} />
           <div className="space-y-1 text-xs">
               <p><span className="font-semibold">SOA:</span> {SOA}%</p>
               <p><span className="font-semibold">DW:</span> {DW}%</p>
               <p><span className="font-semibold">API:</span> {API}%</p>
           </div>
       </div>
    </div>
  );
};