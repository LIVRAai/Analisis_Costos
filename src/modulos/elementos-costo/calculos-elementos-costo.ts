import { ElementoCosto, ResumenCostos } from '@/tipos/elemento-costo';

function valorMensual(elemento: ElementoCosto): number {
  if (elemento.periodicidad === 'Mensual') return elemento.valor;
  if (elemento.periodicidad === 'Anual') return elemento.valor / 12;
  return 0;
}

function valorAnual(elemento: ElementoCosto): number {
  if (elemento.periodicidad === 'Mensual') return elemento.valor * 12;
  if (elemento.periodicidad === 'Anual') return elemento.valor;
  return elemento.valor;
}

export function calcularResumenCostos(elementos: ElementoCosto[]): ResumenCostos {
  const totalMensual = elementos.reduce((acc, e) => acc + valorMensual(e), 0);
  const totalAnual = elementos.reduce((acc, e) => acc + valorAnual(e), 0);
  const totalInversionInicial = elementos.filter((e) => e.tipoAplicacion === 'Inversión inicial').reduce((acc, e) => acc + e.valor, 0);
  const totalOperacionMensual = elementos.filter((e) => e.tipoAplicacion === 'Operación mensual').reduce((acc, e) => acc + valorMensual(e), 0);

  const totalBase = elementos.reduce((acc, e) => acc + e.valor, 0);

  const agrupado = new Map<string, number>();
  for (const e of elementos) agrupado.set(e.grupoMatricial, (agrupado.get(e.grupoMatricial) ?? 0) + e.valor);
  const distribucionPorGrupo = [...agrupado.entries()].map(([grupo, valor]) => ({ grupo, valor, porcentaje: totalBase > 0 ? (valor / totalBase) * 100 : 0 }));

  const participacionPorElemento = elementos.map((e) => ({ elementoId: e.id, nombre: e.nombre, valor: e.valor, porcentaje: totalBase > 0 ? (e.valor / totalBase) * 100 : 0 }));

  return { totalMensual, totalAnual, totalInversionInicial, totalOperacionMensual, distribucionPorGrupo, participacionPorElemento };
}
