import { listarElementosCosto } from '@/modulos/elementos-costo/repositorio-elementos-costo';
import { calcularResultadoFinancieroProyecto } from '@/modulos/financiero/calculos-financieros';
import { obtenerOperacionActual } from '@/modulos/operacion-actual/repositorio-operacion-actual';
import { PanelEjecutivoComparativo, PropuestaPanel } from '@/tipos/panel-ejecutivo';

function inversionInicialPropuesta(proyectoId: string, propuestaId: string): number {
  return listarElementosCosto(proyectoId, propuestaId)
    .filter((e) => e.tipoAplicacion === 'Inversión inicial')
    .reduce((acc, e) => acc + e.valor, 0);
}

export function construirPanelEjecutivoComparativo(proyectoId: string): PanelEjecutivoComparativo {
  const resultados = calcularResultadoFinancieroProyecto(proyectoId);
  const operacionActual = obtenerOperacionActual(proyectoId);

  const costoMensualActual = resultados.resultados[0]?.costoMensualActual ?? 0;
  const costoAnualActual = resultados.resultados[0]?.costoAnualActual ?? 0;
  const cantidadCasos = operacionActual?.indicadoresOperativos.cantidadCasos ?? 0;

  const costoPorCasoActual = cantidadCasos > 0 ? costoMensualActual / cantidadCasos : null;

  const propuestas: PropuestaPanel[] = resultados.resultados.map((r) => ({
    propuestaId: r.propuestaId,
    nombrePropuesta: r.nombrePropuesta,
    costoMensualPropuesta: r.costoMensualPropuesta,
    ahorroMensual: r.ahorroMensual,
    ahorroAnual: r.ahorroAnual,
    retornoInversion: r.retornoInversion.valor,
    tiempoRecuperacion: r.tiempoRecuperacion.valor,
    costoPorCasoProyectado: r.costoPorCasoProyectado.valor,
    variacionPorcentual: r.variacionPorcentual.valor,
    inversionInicial: inversionInicialPropuesta(proyectoId, r.propuestaId),
    flujoAcumuladoAnio1: r.flujoAcumuladoAnio1,
    flujoAcumuladoAnio2: r.flujoAcumuladoAnio2,
    flujoAcumuladoAnio3: r.flujoAcumuladoAnio3,
    alertaSinAhorro: r.ahorroMensual <= 0,
  }));

  const mejor = [...propuestas]
    .filter((p) => p.ahorroAnual > 0)
    .sort((a, b) => b.ahorroAnual - a.ahorroAnual)[0];

  return {
    resumenOperacionActual: {
      costoMensualActual,
      costoAnualActual,
      cantidadCasos,
      costoPorCasoActual,
    },
    propuestas,
    mejorPropuestaId: mejor?.propuestaId ?? null,
    resultadosFinancieros: resultados.resultados,
  };
}
