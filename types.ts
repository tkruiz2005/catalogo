export interface DeudaDetalle {
  SOA?: number;
  DW?: number;
  API?: number;
}

export interface Activo {
  id: string;
  nombre_activo: string;
  dominio: string;
  ip: string;
  Estado?: string;
  Proveedor?: string;
  Deuda?: DeudaDetalle | string;
  tipo_activo?: string;
  es_cloud?: string;
  descripcion?: string;
  usa_arquetipo?: string;
  celula?: string;
  ci_cd?: string;
  Arquitectura?: string;
  Dynatrace?: string;
}

export type GroupedActivos = Record<string, Activo[]>;