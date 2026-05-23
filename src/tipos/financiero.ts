export interface IndicadorFinanciero {
  valor: number | null;
  mensaje: string | null;
}

export interface ResultadoFinancieroPropuesta {
  propuestaId: string;
  nombrePropuesta: string;
  costoMensualActual: number;
  costoAnualActual: number;
  costoMensualPropuesta: number;
  costoAnualPropuesta: number;
  ahorroMensual: number;
  ahorroAnual: number;
  variacionPorcentual: IndicadorFinanciero;
  costoPorCasoActual: IndicadorFinanciero;
  costoPorCasoProyectado: IndicadorFinanciero;
  retornoInversion: IndicadorFinanciero;
  tiempoRecuperacion: IndicadorFinanciero;
  flujoAcumuladoAnio1: number;
  flujoAcumuladoAnio2: number;
  flujoAcumuladoAnio3: number;
}

export interface ResultadoComparativoFinanciero {
  proyectoId: string;
  resultados: ResultadoFinancieroPropuesta[];
}
