export type MonedaProyecto = 'USD' | 'EUR' | 'COP' | 'MXN';

export interface Proyecto {
  id: string;
  cliente: string;
  nombreProyecto: string;
  tipoOperacion: string;
  responsable: string;
  fecha: string;
  moneda: MonedaProyecto;
  cantidadCasosMensuales: number;
  observaciones: string;
  creadoEn: string;
}

export type ProyectoEntrada = Omit<Proyecto, 'id' | 'creadoEn'>;
