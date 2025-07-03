import React from 'react';
import { IconForAssetType } from './Icons';

interface StatsProps {
    stats: Record<string, number>;
}

const formatTypeName = (type: string) => {
    if (type === 'base de datos') return 'Bases de Datos';
    const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
    // Avoid double 's' at the end
    return capitalized.endsWith('s') ? capitalized : `${capitalized}s`;
};

export const Stats: React.FC<StatsProps> = ({ stats }) => {
    const sortedStats = Object.entries(stats).sort(([a], [b]) => a.localeCompare(b));

    if (sortedStats.length === 0) {
        return null;
    }

    return (
        <div className="mb-12 max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
                {sortedStats.map(([type, count]) => {
                    return (
                        <div 
                            key={type} 
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out flex items-center space-x-3 border border-gray-200 hover:border-supervielle-orange transform hover:-translate-y-0.5 grow sm:grow-0"
                            style={{ flexBasis: '160px' }}
                            role="region"
                            aria-labelledby={`stat-label-${type}`}
                        >
                            <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full">
                                <IconForAssetType type={type} className="w-6 h-6 text-supervielle-orange" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-2xl font-bold text-gray-800 truncate">{count}</p>
                                <p id={`stat-label-${type}`} className="text-xs font-medium text-gray-500 capitalize truncate">{formatTypeName(type)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};