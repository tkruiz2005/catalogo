import React from 'react';
import { GroupedActivos } from '../types';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
    loading: boolean;
    error: string | null;
    groupedAssets: GroupedActivos;
    hasFilters: boolean;
}

export const AssetGrid: React.FC<AssetGridProps> = ({ loading, error, groupedAssets, hasFilters }) => {
    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (Object.keys(groupedAssets).length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-600">No se encontraron activos.</h2>
                <p className="text-gray-500 mt-2">
                    {hasFilters ? "Prueba a cambiar los filtros de búsqueda." : "Parece que no hay nada que mostrar aquí por ahora."}
                </p>
            </div>
        );
    }

    return (
        <>
            {Object.entries(groupedAssets).sort(([domainA], [domainB]) => domainA.localeCompare(domainB)).map(([domain, domainActivos]) => (
                <section key={domain} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-supervielle-orange inline-block">
                        {domain}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {domainActivos.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
};
