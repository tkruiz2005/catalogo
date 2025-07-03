import React from 'react';
import { SearchIcon, LayersIcon, GitMergeIcon, ServerIcon, TagIcon } from './Icons';

interface FilterBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    arquetipoFilter: string;
    setArquetipoFilter: (value: string) => void;
    ciCdFilter: string;
    setCiCdFilter: (value: string) => void;
    tipoActivoFilter: string;
    setTipoActivoFilter: (value: string) => void;
    estadoFilter: string;
    setEstadoFilter: (value: string) => void;
    assetTypes: string[];
    assetStatuses: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    setSearchTerm,
    arquetipoFilter,
    setArquetipoFilter,
    ciCdFilter,
    setCiCdFilter,
    tipoActivoFilter,
    setTipoActivoFilter,
    estadoFilter,
    setEstadoFilter,
    assetTypes,
    assetStatuses,
}) => {
    return (
        <div className="mb-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4">
                <div className="relative lg:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o dominio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-supervielle-orange/50 focus:border-supervielle-orange transition duration-150 ease-in-out"
                        aria-label="Buscar por nombre o dominio"
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LayersIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        value={arquetipoFilter}
                        onChange={(e) => setArquetipoFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-supervielle-orange/50 focus:border-supervielle-orange transition duration-150 ease-in-out appearance-none bg-white"
                        aria-label="Filtrar por arquetipo"
                    >
                        <option value="todos">Todos los Arquetipos</option>
                        <option value="si">Usa Arquetipo</option>
                        <option value="no">No Usa Arquetipo</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GitMergeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        value={ciCdFilter}
                        onChange={(e) => setCiCdFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-supervielle-orange/50 focus:border-supervielle-orange transition duration-150 ease-in-out appearance-none bg-white"
                        aria-label="Filtrar por CI/CD"
                    >
                        <option value="todos">Todo CI/CD</option>
                        <option value="si">Con CI/CD</option>
                        <option value="no">Sin CI/CD</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ServerIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        value={tipoActivoFilter}
                        onChange={(e) => setTipoActivoFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-supervielle-orange/50 focus:border-supervielle-orange transition duration-150 ease-in-out appearance-none bg-white"
                        aria-label="Filtrar por tipo de activo"
                    >
                        <option value="todos">Todos los Tipos</option>
                        {assetTypes.map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TagIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-supervielle-orange/50 focus:border-supervielle-orange transition duration-150 ease-in-out appearance-none bg-white"
                        aria-label="Filtrar por Estado"
                    >
                        <option value="todos">Todos los Estados</option>
                        {assetStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
