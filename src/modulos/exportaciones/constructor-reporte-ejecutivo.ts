import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { construirPanelEjecutivoComparativo } from '@/modulos/panel-ejecutivo/servicio-panel-ejecutivo';
import { listarElementosCosto } from '@/modulos/elementos-costo/repositorio-elementos-costo';
import { ReporteEjecutivo } from '@/tipos/exportaciones';

export function construirReporteEjecutivo(proyectoId: string, propuestasSeleccionadas: string[]): ReporteEjecutivo {
  const proyecto = obtenerProyectoPorId(proyectoId);
  const panel = construirPanelEjecutivoComparativo(proyectoId);
  const propuestas = panel.propuestas.filter((p) => propuestasSeleccionadas.includes(p.propuestaId));

  const resumenEjecutivo = propuestas.length === 0
    ? 'No se seleccionaron propuestas para exportar.'
    : `Se analizaron ${propuestas.length} propuesta(s). La propuesta con mejor ahorro anual fue ${panel.propuestas.find((p) => p.propuestaId === panel.mejorPropuestaId)?.nombrePropuesta ?? 'No disponible'}.`;

  const secciones = [
    {
      titulo: 'Operación actual',
      contenido: [
        `Costo mensual actual: ${panel.resumenOperacionActual.costoMensualActual.toLocaleString('es-CO')}`,
        `Costo anual actual: ${panel.resumenOperacionActual.costoAnualActual.toLocaleString('es-CO')}`,
        `Costo por caso actual: ${panel.resumenOperacionActual.costoPorCasoActual?.toLocaleString('es-CO', { maximumFractionDigits: 2 }) ?? 'No disponible'}`,
      ],
    },
    {
      titulo: 'Comparativo de propuestas',
      contenido: propuestas.map((p) => `${p.nombrePropuesta}: ahorro mensual ${p.ahorroMensual.toLocaleString('es-CO')}, ahorro anual ${p.ahorroAnual.toLocaleString('es-CO')}, retorno de inversión ${p.retornoInversion === null ? 'No disponible' : `${p.retornoInversion.toFixed(2)} %`}, tiempo de recuperación ${p.tiempoRecuperacion === null ? 'No disponible' : `${p.tiempoRecuperacion.toFixed(2)} meses`}.`),
    },
    {
      titulo: 'Tabla de costos e indicadores operativos',
      contenido: propuestas.flatMap((p) => {
        const totalCostos = listarElementosCosto(proyectoId, p.propuestaId).reduce((acc, e) => acc + e.valor, 0);
        return [
          `Propuesta ${p.nombrePropuesta} — Inversión inicial: ${p.inversionInicial.toLocaleString('es-CO')} — Total costos: ${totalCostos.toLocaleString('es-CO')}`,
          `Flujo acumulado año 1: ${p.flujoAcumuladoAnio1.toLocaleString('es-CO')}, año 2: ${p.flujoAcumuladoAnio2.toLocaleString('es-CO')}, año 3: ${p.flujoAcumuladoAnio3.toLocaleString('es-CO')}`,
        ];
      }),
    },
    {
      titulo: 'Conclusión ejecutiva',
      contenido: [
        panel.mejorPropuestaId
          ? `Se recomienda priorizar la propuesta ${panel.propuestas.find((p) => p.propuestaId === panel.mejorPropuestaId)?.nombrePropuesta} por su mejor desempeño financiero comparativo.`
          : 'No fue posible identificar una propuesta superior con ahorro positivo.',
      ],
    },
  ];

  return {
    nombreCliente: proyecto?.cliente ?? 'Cliente no disponible',
    nombreProyecto: proyecto?.nombreProyecto ?? 'Proyecto no disponible',
    fecha: new Date().toLocaleDateString('es-CO'),
    resumenEjecutivo,
    secciones,
  };
}
