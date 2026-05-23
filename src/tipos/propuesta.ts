export type TipoPropuesta =
  | 'Operación interna optimizada'
  | 'Operación tercerizada'
  | 'Operación híbrida'
  | 'Implementación tecnológica'
  | 'Automatización'
  | 'Otra';

export interface Propuesta {
  id: string;
  proyectoId: string;
  nombrePropuesta: string;
  descripcion: string;
  tipoPropuesta: TipoPropuesta;
  proveedorPrincipal: string;
  anioInicial: number;
  horizonteAnalisis: number;
  observaciones: string;
  creadaEn: string;
}

export type PropuestaEntrada = Omit<Propuesta, 'id' | 'creadaEn' | 'proyectoId'>;
