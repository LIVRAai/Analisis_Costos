import { listarElementosCosto } from '@/modulos/elementos-costo/repositorio-elementos-costo';
import { obtenerOperacionActual } from '@/modulos/operacion-actual/repositorio-operacion-actual';
import { listarPropuestasPorProyecto } from '@/modulos/propuestas-dinamicas/repositorio-propuestas';
import { ResultadoComparativoFinanciero, ResultadoFinancieroPropuesta, IndicadorFinanciero } from '@/tipos/financiero';
import { ElementoCosto } from '@/tipos/elemento-costo';

function indicadorNoCalculable(mensaje: string): IndicadorFinanciero {
  return { valor: null, mensaje };
}

function costoMensualPropuesta(elementos: ElementoCosto[]): number {
  return elementos.reduce((acc, elemento) => {
    if (elemento.periodicidad === 'Mensual') return acc + elemento.valor;
    if (elemento.periodicidad === 'Anual') return acc + elemento.valor / 12;
    return acc;
  }, 0);
}

function inversionInicialAnio(elementos: ElementoCosto[], anio: 1 | 2 | 3): number {
  return elementos
    .filter((e) => e.tipoAplicacion === 'Inversión inicial' && e.anioAplicacion === anio)
    .reduce((acc, e) => acc + e.valor, 0);
}

function flujoAcumulado(inversion: number, ahorroAnual: number, anio: 1 | 2 | 3): number {
  return ahorroAnual * anio - inversion;
}

export function calcularResultadoFinancieroProyecto(proyectoId: string): ResultadoComparativoFinanciero {
  const operacionActual = obtenerOperacionActual(proyectoId);
  const propuestas = listarPropuestasPorProyecto(proyectoId);

  const costoMensualActual = operacionActual
    ? Object.values(operacionActual.costosActuales).reduce((acc, valor) => acc + valor, 0)
    : 0;
  const costoAnualActual = costoMensualActual * 12;
  const casosMensuales = operacionActual?.indicadoresOperativos.cantidadCasos ?? 0;

  const resultados: ResultadoFinancieroPropuesta[] = propuestas.map((propuesta) => {
    const elementos = listarElementosCosto(proyectoId, propuesta.id);
    const mensualPropuesta = costoMensualPropuesta(elementos);
    const anualPropuesta = mensualPropuesta * 12;

    const ahorroMensual = costoMensualActual - mensualPropuesta;
    const ahorroAnual = ahorroMensual * 12;

    const variacionPorcentual = costoMensualActual <= 0
      ? indicadorNoCalculable('No se puede calcular la variación porcentual porque el costo mensual actual es cero.')
      : { valor: (ahorroMensual / costoMensualActual) * 100, mensaje: null };

    const costoPorCasoActual = casosMensuales <= 0
      ? indicadorNoCalculable('No se puede calcular el costo por caso actual porque la cantidad de casos mensuales es cero.')
      : { valor: costoMensualActual / casosMensuales, mensaje: null };

    const costoPorCasoProyectado = casosMensuales <= 0
      ? indicadorNoCalculable('No se puede calcular el costo por caso proyectado porque la cantidad de casos mensuales es cero.')
      : { valor: mensualPropuesta / casosMensuales, mensaje: null };

    const inversionInicialAnio1 = inversionInicialAnio(elementos, 1);
    const beneficioObtenido = ahorroAnual;

    const retornoInversion = inversionInicialAnio1 <= 0
      ? indicadorNoCalculable('No se puede calcular el retorno de inversión porque la inversión inicial del año 1 es cero.')
      : { valor: ((beneficioObtenido - inversionInicialAnio1) / inversionInicialAnio1) * 100, mensaje: null };

    const tiempoRecuperacion = ahorroMensual <= 0
      ? indicadorNoCalculable('No se puede calcular el tiempo de recuperación porque el ahorro mensual es cero o negativo.')
      : inversionInicialAnio1 <= 0
        ? indicadorNoCalculable('No se puede calcular el tiempo de recuperación porque la inversión inicial del año 1 es cero.')
        : { valor: inversionInicialAnio1 / ahorroMensual, mensaje: null };

    const inversionY1 = inversionInicialAnio1;
    const inversionY2 = inversionInicialAnio(elementos, 2);
    const inversionY3 = inversionInicialAnio(elementos, 3);

    return {
      propuestaId: propuesta.id,
      nombrePropuesta: propuesta.nombrePropuesta,
      costoMensualActual,
      costoAnualActual,
      costoMensualPropuesta: mensualPropuesta,
      costoAnualPropuesta: anualPropuesta,
      ahorroMensual,
      ahorroAnual,
      variacionPorcentual,
      costoPorCasoActual,
      costoPorCasoProyectado,
      retornoInversion,
      tiempoRecuperacion,
      flujoAcumuladoAnio1: flujoAcumulado(inversionY1, ahorroAnual, 1),
      flujoAcumuladoAnio2: flujoAcumulado(inversionY1 + inversionY2, ahorroAnual, 2),
      flujoAcumuladoAnio3: flujoAcumulado(inversionY1 + inversionY2 + inversionY3, ahorroAnual, 3),
    };
  });

  return { proyectoId, resultados };
}
