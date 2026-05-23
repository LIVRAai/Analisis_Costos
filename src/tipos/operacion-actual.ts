export interface CostosActuales {
  talentoHumano: number;
  tecnologia: number;
  operacion: number;
  infraestructura: number;
  telefonia: number;
  servicios: number;
  consultoria: number;
  otros: number;
}

export interface IndicadoresOperativosActuales {
  cantidadCasos: number;
  interaccionesMensuales: number;
  tiempoPromedioAtencion: number;
  nivelServicio: number;
  porcentajeAbandono: number;
  productividad: number;
  personasRequeridas: number;
  casosPorAgente: number;
  casosPendientes: number;
  reprocesos: number;
  nivelAutomatizacion: number;
}

export interface OperacionActual {
  proyectoId: string;
  costosActuales: CostosActuales;
  indicadoresOperativos: IndicadoresOperativosActuales;
  actualizadoEn: string;
}

export interface OperacionActualEntrada {
  costosActuales: CostosActuales;
  indicadoresOperativos: IndicadoresOperativosActuales;
}
