import { ResultadoFinancieroPropuesta } from '@/tipos/financiero';

export interface ResumenOperacionActualPanel {
  costoMensualActual: number;
  costoAnualActual: number;
  cantidadCasos: number;
  costoPorCasoActual: number | null;
}

export interface PropuestaPanel {
  propuestaId: string;
  nombrePropuesta: string;
  costoMensualPropuesta: number;
  ahorroMensual: number;
  ahorroAnual: number;
  retornoInversion: number | null;
  tiempoRecuperacion: number | null;
  costoPorCasoProyectado: number | null;
  variacionPorcentual: number | null;
  inversionInicial: number;
  flujoAcumuladoAnio1: number;
  flujoAcumuladoAnio2: number;
  flujoAcumuladoAnio3: number;
  alertaSinAhorro: boolean;
}

export interface PanelEjecutivoComparativo {
  resumenOperacionActual: ResumenOperacionActualPanel;
  propuestas: PropuestaPanel[];
  mejorPropuestaId: string | null;
  resultadosFinancieros: ResultadoFinancieroPropuesta[];
}
