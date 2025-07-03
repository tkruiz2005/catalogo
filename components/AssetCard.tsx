import React from 'react';
import { Activo } from '../types';
import { IconForAssetType, CloudIcon, FileTextIcon, LayersIcon, UsersIcon, GitMergeIcon, ArchitectureIcon, DynatraceIcon, ServerIcon, BriefcaseIcon } from './Icons';
import { DeudaProgress } from './DeudaProgress';

interface AssetCardProps {
  asset: Activo;
}

const renderSafely = (value: unknown, fallback: string = 'No disponible'): string => {
    if (typeof value === 'string' && value) {
        return value;
    }
    if (typeof value === 'number') {
        return String(value);
    }
    return fallback;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const isCloud = asset.es_cloud?.toLowerCase() === 'si';
  const cardBgClass = asset.Estado?.toLowerCase() === 'operativa' ? 'bg-estado-operativa' : 'bg-white';

  return (
    <div className={`${cardBgClass} rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden flex flex-col border border-gray-200 hover:border-supervielle-orange transform hover:-translate-y-1`}>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{asset.nombre_activo}</h3>
                <p className="text-sm text-gray-500 capitalize">{renderSafely(asset.tipo_activo, 'Tipo no especificado')}</p>
            </div>
            <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
                <IconForAssetType type={asset.tipo_activo} className="w-6 h-6 text-gray-500" />
            </div>
        </div>
        
        <div className="space-y-4 text-sm">
            <div className="flex items-center">
                <span className="font-mono text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{asset.ip}</span>
            </div>
            <div className="flex items-center text-gray-600">
                {isCloud ? (
                    <CloudIcon className="w-5 h-5 mr-2 text-supervielle-orange" />
                ) : (
                    <ServerIcon className="w-5 h-5 mr-2 text-gray-500" />
                )}
                <span className="font-medium">
                    {isCloud ? 'Alojado en Cloud' : 'Alojado On-Premise'}
                </span>
            </div>
            <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <FileTextIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700">Descripción</p>
                    <p className="text-gray-500 leading-tight">
                        {renderSafely(asset.descripcion, 'no disponible')}
                    </p>
                </div>
            </div>
            <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <LayersIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700">Usa Arquetipos</p>
                    <p className="text-gray-500 leading-tight">
                        {renderSafely(asset.usa_arquetipo, 'No especificado')}
                    </p>
                </div>
            </div>
             <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <GitMergeIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700">CI/CD</p>
                    <p className="text-gray-500 leading-tight">
                        {renderSafely(asset.ci_cd, 'No especificado')}
                    </p>
                </div>
            </div>
            <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <UsersIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700">Célula</p>
                    <p className="text-gray-500 leading-tight">
                        {renderSafely(asset.celula, 'No disponible')}
                    </p>
                </div>
            </div>
            {asset.Proveedor && (
              <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                  <BriefcaseIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                      <p className="font-medium text-gray-700">Proveedor</p>
                      <p className="text-gray-500 leading-tight">
                          {renderSafely(asset.Proveedor)}
                      </p>
                  </div>
              </div>
            )}
            <DeudaProgress deuda={asset.Deuda} />
            <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                <ArchitectureIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-gray-700">Arquitectura</p>
                    {typeof asset.Arquitectura === 'string' && asset.Arquitectura ? (
                        <a 
                          href={asset.Arquitectura} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-supervielle-orange hover:underline hover:text-orange-700 transition-colors"
                        >
                            Ver documentación
                        </a>
                    ) : (
                        <p className="text-gray-500 leading-tight">
                            No disponible
                        </p>
                    )}
                </div>
            </div>
            {typeof asset.Dynatrace === 'string' && asset.Dynatrace && (
                <div className="flex items-start text-gray-600 pt-3 border-t border-gray-100">
                    <DynatraceIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-gray-700">Dynatrace</p>
                        <a 
                          href={asset.Dynatrace} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-supervielle-orange hover:underline hover:text-orange-700 transition-colors"
                        >
                            Ver en Dynatrace
                        </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};