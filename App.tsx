import React, { useState, useEffect, useMemo } from 'react';
import { Activo, GroupedActivos } from './types';
import { Stats } from './components/Stats';
import { FilterBar } from './components/FilterBar';
import { AssetGrid } from './components/AssetGrid';
import { Pagination } from './components/Pagination';

const API_URL = 'https://6863ee2588359a373e96e80b.mockapi.io/api/v1/activos';

const groupActivosByDomain = (activos: Activo[]): GroupedActivos => {
  return activos.reduce((acc, activo) => {
    const domain = activo.dominio || 'Sin Dominio';
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(activo);
    return acc;
  }, {} as GroupedActivos);
};

export const App: React.FC = () => {
  const [activos, setActivos] = useState<Activo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [arquetipoFilter, setArquetipoFilter] = useState<string>('todos');
  const [ciCdFilter, setCiCdFilter] = useState<string>('todos');
  const [tipoActivoFilter, setTipoActivoFilter] = useState<string>('todos');
  const [estadoFilter, setEstadoFilter] = useState<string>('todos');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchActivos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.statusText}`);
        }
        const data: Activo[] = await response.json();
        setActivos(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido.';
        setError(`No se pudieron cargar los activos. ${errorMessage}`);
        console.error("Failed to fetch assets:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchActivos();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, arquetipoFilter, ciCdFilter, tipoActivoFilter, estadoFilter, itemsPerPage]);

  const assetTypes = useMemo(() => {
    const types = new Set(activos.map(a => a.tipo_activo).filter((t): t is string => !!t));
    return Array.from(types).sort((a, b) => a.localeCompare(b));
  }, [activos]);

  const assetStatuses = useMemo(() => {
    const statuses = new Set(activos.map(a => a.Estado).filter((s): s is string => !!s));
    return Array.from(statuses).sort((a, b) => a.localeCompare(b));
  }, [activos]);

  const assetStats = useMemo(() => {
    if (loading || error) return {};
    return activos.reduce((acc, asset) => {
      const type = asset.tipo_activo;
      if (typeof type === 'string' && type) {
        const lowerCaseType = type.toLowerCase();
        acc[lowerCaseType] = (acc[lowerCaseType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [activos, loading, error]);

  const filteredActivos = useMemo(() => {
    return activos.filter(asset => {
        const arquetipoMatch = arquetipoFilter === 'todos' ? true : String(asset.usa_arquetipo || '').toLowerCase() === arquetipoFilter;
        const ciCdMatch = ciCdFilter === 'todos' ? true : String(asset.ci_cd || '').toLowerCase() === ciCdFilter;
        const tipoActivoMatch = tipoActivoFilter === 'todos' ? true : String(asset.tipo_activo || '') === tipoActivoFilter;
        const estadoMatch = estadoFilter === 'todos' ? true : String(asset.Estado || '') === estadoFilter;
        
        const searchMatch = !searchTerm || 
            (asset.dominio && asset.dominio.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (asset.nombre_activo && asset.nombre_activo.toLowerCase().includes(searchTerm.toLowerCase()));

        return arquetipoMatch && ciCdMatch && tipoActivoMatch && estadoMatch && searchMatch;
    });
  }, [activos, searchTerm, arquetipoFilter, ciCdFilter, tipoActivoFilter, estadoFilter]);
  
  const totalPages = Math.ceil(filteredActivos.length / itemsPerPage);

  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivos.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredActivos, itemsPerPage]);
  
  const paginatedAndGroupedAssets = useMemo(() => groupActivosByDomain(paginatedAssets), [paginatedAssets]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <header className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-supervielle-orange tracking-tight">
                    Catalogo de Activos SPV
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Una vista centralizada de todos sus activos tecnológicos, organizados para una gestión clara y eficiente.
                </p>
            </header>

            {!loading && <Stats stats={assetStats} />}

            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                arquetipoFilter={arquetipoFilter}
                setArquetipoFilter={setArquetipoFilter}
                ciCdFilter={ciCdFilter}
                setCiCdFilter={setCiCdFilter}
                tipoActivoFilter={tipoActivoFilter}
                setTipoActivoFilter={setTipoActivoFilter}
                estadoFilter={estadoFilter}
                setEstadoFilter={setEstadoFilter}
                assetTypes={assetTypes}
                assetStatuses={assetStatuses}
            />

            <AssetGrid 
                loading={loading}
                error={error}
                groupedAssets={paginatedAndGroupedAssets}
                hasFilters={!!(searchTerm || arquetipoFilter !== 'todos' || ciCdFilter !== 'todos' || tipoActivoFilter !== 'todos' || estadoFilter !== 'todos')}
            />
            
            {filteredActivos.length > 0 && !loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredActivos.length}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            )}
        </main>
    </div>
  );
};