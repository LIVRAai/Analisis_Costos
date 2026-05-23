import { construirReporteEjecutivo } from '@/modulos/exportaciones/constructor-reporte-ejecutivo';
import { construirPanelEjecutivoComparativo } from '@/modulos/panel-ejecutivo/servicio-panel-ejecutivo';

export async function exportarPdf(proyectoId: string, propuestasSeleccionadas: string[]) {
  const { default: jsPDF } = await import('jspdf');
  const reporte = construirReporteEjecutivo(proyectoId, propuestasSeleccionadas);
  const panel = construirPanelEjecutivoComparativo(proyectoId);
  const propuestas = panel.propuestas.filter((p) => propuestasSeleccionadas.includes(p.propuestaId));

  const doc = new jsPDF();
  let y = 15;

  const escribir = (texto: string, salto = 7) => {
    const lineas = doc.splitTextToSize(texto, 180);
    doc.text(lineas, 15, y);
    y += lineas.length * 6 + (salto - 6);
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
  };

  doc.setFontSize(16);
  escribir('Reporte Ejecutivo Comparativo');
  doc.setFontSize(11);
  escribir(`Nombre del cliente: ${reporte.nombreCliente}`);
  escribir(`Nombre del proyecto: ${reporte.nombreProyecto}`);
  escribir(`Fecha: ${reporte.fecha}`);
  escribir(`Resumen ejecutivo: ${reporte.resumenEjecutivo}`);

  reporte.secciones.forEach((seccion) => {
    doc.setFont(undefined, 'bold');
    escribir(seccion.titulo);
    doc.setFont(undefined, 'normal');
    seccion.contenido.forEach((linea) => escribir(`- ${linea}`));
  });

  doc.setFont(undefined, 'bold');
  escribir('Comparativo de propuestas');
  doc.setFont(undefined, 'normal');
  propuestas.forEach((p) => {
    escribir(`${p.nombrePropuesta}: Ahorro mensual ${p.ahorroMensual.toLocaleString('es-CO')}, ahorro anual ${p.ahorroAnual.toLocaleString('es-CO')}, retorno de inversión ${p.retornoInversion === null ? 'No disponible' : `${p.retornoInversion.toFixed(2)} %`}, tiempo de recuperación ${p.tiempoRecuperacion === null ? 'No disponible' : `${p.tiempoRecuperacion.toFixed(2)} meses`}, costo por caso ${p.costoPorCasoProyectado === null ? 'No disponible' : p.costoPorCasoProyectado.toFixed(2)}.`);
  });

  doc.save(`reporte-ejecutivo-${proyectoId}.pdf`);
}
