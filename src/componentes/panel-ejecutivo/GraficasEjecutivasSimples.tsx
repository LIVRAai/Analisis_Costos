import { listarElementosCosto } from '@/modulos/elementos-costo/repositorio-elementos-costo';
import { PanelEjecutivoComparativo } from '@/tipos/panel-ejecutivo';

function Barra({ etiqueta, valor, maximo }: { etiqueta: string; valor: number; maximo: number }) {
  const ancho = maximo > 0 ? (valor / maximo) * 100 : 0;
  return <div className="space-y-1"><div className="flex justify-between text-xs"><span>{etiqueta}</span><span>{valor.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</span></div><div className="h-2 w-full rounded bg-slate-200"><div className="h-2 rounded bg-blue-600" style={{ width: `${Math.min(100, Math.max(0, ancho))}%` }} /></div></div>;
}

export function GraficasEjecutivasSimples({ panel, proyectoId }: { panel: PanelEjecutivoComparativo; proyectoId: string }) {
  const maxCostoMensual = Math.max(panel.resumenOperacionActual.costoMensualActual, ...panel.propuestas.map((p) => p.costoMensualPropuesta), 1);
  const maxAhorroAnual = Math.max(...panel.propuestas.map((p) => Math.max(0, p.ahorroAnual)), 1);
  const maxInversionOperacion = Math.max(...panel.propuestas.map((p) => Math.max(p.inversionInicial, p.costoMensualPropuesta)), 1);
  const maxFlujo = Math.max(...panel.propuestas.map((p) => Math.max(p.flujoAcumuladoAnio1, p.flujoAcumuladoAnio2, p.flujoAcumuladoAnio3)), 1);

  const distribucion = panel.propuestas.map((p) => {
    const elementos = listarElementosCosto(proyectoId, p.propuestaId);
    const total = elementos.reduce((acc, e) => acc + e.valor, 0);
    const porGrupo = new Map<string, number>();
    elementos.forEach((e) => porGrupo.set(e.grupoMatricial, (porGrupo.get(e.grupoMatricial) ?? 0) + e.valor));
    return {
      propuesta: p.nombrePropuesta,
      grupos: [...porGrupo.entries()].map(([grupo, valor]) => ({ grupo, porcentaje: total > 0 ? (valor / total) * 100 : 0 })),
    };
  });

  return <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <Bloque titulo="Comparativo de costo mensual">
      <Barra etiqueta="Operación actual" valor={panel.resumenOperacionActual.costoMensualActual} maximo={maxCostoMensual} />
      {panel.propuestas.map((p) => <Barra key={p.propuestaId} etiqueta={p.nombrePropuesta} valor={p.costoMensualPropuesta} maximo={maxCostoMensual} />)}
    </Bloque>

    <Bloque titulo="Comparativo de ahorro anual">
      {panel.propuestas.map((p) => <Barra key={p.propuestaId} etiqueta={p.nombrePropuesta} valor={Math.max(0, p.ahorroAnual)} maximo={maxAhorroAnual} />)}
    </Bloque>

    <Bloque titulo="Inversión inicial frente a operación mensual">
      {panel.propuestas.map((p) => <div key={p.propuestaId} className="space-y-1"><p className="text-xs font-medium">{p.nombrePropuesta}</p><Barra etiqueta="Inversión inicial" valor={p.inversionInicial} maximo={maxInversionOperacion} /><Barra etiqueta="Operación mensual" valor={p.costoMensualPropuesta} maximo={maxInversionOperacion} /></div>)}
    </Bloque>

    <Bloque titulo="Flujo acumulado por año">
      {panel.propuestas.map((p) => <div key={p.propuestaId} className="space-y-1"><p className="text-xs font-medium">{p.nombrePropuesta}</p><Barra etiqueta="Año 1" valor={Math.max(0, p.flujoAcumuladoAnio1)} maximo={maxFlujo} /><Barra etiqueta="Año 2" valor={Math.max(0, p.flujoAcumuladoAnio2)} maximo={maxFlujo} /><Barra etiqueta="Año 3" valor={Math.max(0, p.flujoAcumuladoAnio3)} maximo={maxFlujo} /></div>)}
    </Bloque>

    <Bloque titulo="Distribución de costos por grupo matricial">
      {distribucion.map((d) => <div key={d.propuesta} className="space-y-1"><p className="text-xs font-medium">{d.propuesta}</p>{d.grupos.length === 0 ? <p className="text-xs text-slate-500">Sin elementos de costo.</p> : d.grupos.map((g) => <div key={g.grupo} className="flex justify-between text-xs"><span>{g.grupo}</span><span>{g.porcentaje.toFixed(1)} %</span></div>)}</div>)}
    </Bloque>
  </section>;
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"><h3 className="text-base font-semibold text-slate-900">{titulo}</h3>{children}</article>;
}
