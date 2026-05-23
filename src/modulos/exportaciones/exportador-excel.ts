import { construirPanelEjecutivoComparativo } from '@/modulos/panel-ejecutivo/servicio-panel-ejecutivo';
import { construirReporteEjecutivo } from '@/modulos/exportaciones/constructor-reporte-ejecutivo';

export async function exportarExcel(proyectoId: string, propuestasSeleccionadas: string[]) {
  const XLSX = await import('xlsx');
  const panel = construirPanelEjecutivoComparativo(proyectoId);
  const reporte = construirReporteEjecutivo(proyectoId, propuestasSeleccionadas);
  const propuestas = panel.propuestas.filter((p) => propuestasSeleccionadas.includes(p.propuestaId));

  const libro = XLSX.utils.book_new();

  const portada = [
    ['Nombre del cliente', reporte.nombreCliente],
    ['Nombre del proyecto', reporte.nombreProyecto],
    ['Fecha', reporte.fecha],
    ['Resumen ejecutivo', reporte.resumenEjecutivo],
  ];
  XLSX.utils.book_append_sheet(libro, XLSX.utils.aoa_to_sheet(portada), 'Portada ejecutiva');

  const comparativo = propuestas.map((p) => ({
    'Propuesta': p.nombrePropuesta,
    'Costo mensual': p.costoMensualPropuesta,
    'Costo anual': p.costoMensualPropuesta * 12,
    'Ahorro mensual': p.ahorroMensual,
    'Ahorro anual': p.ahorroAnual,
    'Retorno de inversión': p.retornoInversion,
    'Tiempo de recuperación': p.tiempoRecuperacion,
    'Costo por caso proyectado': p.costoPorCasoProyectado,
    'Variación porcentual': p.variacionPorcentual,
    'Inversión inicial': p.inversionInicial,
    'Flujo acumulado año 1': p.flujoAcumuladoAnio1,
    'Flujo acumulado año 2': p.flujoAcumuladoAnio2,
    'Flujo acumulado año 3': p.flujoAcumuladoAnio3,
  }));
  XLSX.utils.book_append_sheet(libro, XLSX.utils.json_to_sheet(comparativo), 'Comparativo propuestas');

  const wsIndicadores = XLSX.utils.aoa_to_sheet([
    ['Indicador', 'Valor'],
    ['Costo mensual actual', panel.resumenOperacionActual.costoMensualActual],
    ['Costo anual actual', panel.resumenOperacionActual.costoAnualActual],
    ['Costo por caso actual', panel.resumenOperacionActual.costoPorCasoActual],
  ]);
  XLSX.utils.book_append_sheet(libro, wsIndicadores, 'Operación actual');

  XLSX.writeFile(libro, `reporte-ejecutivo-${proyectoId}.xlsx`);
}
