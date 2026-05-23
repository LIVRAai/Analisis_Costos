export type TipoCosto =
  | 'Talento humano'
  | 'Tecnología'
  | 'Operación'
  | 'Infraestructura'
  | 'Telefonía'
  | 'Servicios'
  | 'Consultoría'
  | 'Otros';

export type NaturalezaCosto = 'Fijo' | 'Variable';
export type PeriodicidadCosto = 'Mensual' | 'Anual' | 'Única vez';
export type TipoAplicacionCosto = 'Inversión inicial' | 'Operación mensual';
export type MonedaCosto = 'USD' | 'EUR' | 'COP' | 'MXN';

export interface ElementoCosto {
  id: string;
  proyectoId: string;
  propuestaId: string;
  nombre: string;
  proveedor: string;
  grupoMatricial: string;
  subgrupoMatricial: string;
  tipoCosto: TipoCosto;
  naturalezaCosto: NaturalezaCosto;
  periodicidad: PeriodicidadCosto;
  valor: number;
  moneda: MonedaCosto;
  tipoAplicacion: TipoAplicacionCosto;
  amortizable: boolean;
  tiempoAmortizacion: number;
  anioAplicacion: 1 | 2 | 3;
  observaciones: string;
  creadoEn: string;
}

export type ElementoCostoEntrada = Omit<ElementoCosto, 'id' | 'creadoEn' | 'proyectoId' | 'propuestaId'>;

export interface ResumenCostos {
  totalMensual: number;
  totalAnual: number;
  totalInversionInicial: number;
  totalOperacionMensual: number;
  distribucionPorGrupo: Array<{ grupo: string; valor: number; porcentaje: number }>;
  participacionPorElemento: Array<{ elementoId: string; nombre: string; valor: number; porcentaje: number }>;
}
