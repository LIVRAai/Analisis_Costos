export type FormatoExportacion = 'excel' | 'pdf';

export interface ConfiguracionExportacion {
  proyectoId: string;
  propuestasSeleccionadas: string[];
  fechaGeneracion: string;
}

export interface SeccionReporteEjecutivo {
  titulo: string;
  contenido: string[];
}

export interface ReporteEjecutivo {
  nombreCliente: string;
  nombreProyecto: string;
  fecha: string;
  resumenEjecutivo: string;
  secciones: SeccionReporteEjecutivo[];
}

export interface PlantillaExportacion {
  id: string;
  nombre: string;
  version: string;
  soportaPowerPointFuturo: boolean;
}
