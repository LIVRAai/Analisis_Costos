import { ResumenCostos } from '@/tipos/elemento-costo';

export function ResumenCostosVista({ resumen }: { resumen: ResumenCostos }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
    <h2 className="text-lg font-semibold">Resumen de costos</h2>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <Tarjeta titulo="Total mensual" valor={resumen.totalMensual} />
      <Tarjeta titulo="Total anual" valor={resumen.totalAnual} />
      <Tarjeta titulo="Total inversión inicial" valor={resumen.totalInversionInicial} />
      <Tarjeta titulo="Total operación mensual" valor={resumen.totalOperacionMensual} />
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div><h3 className="text-sm font-semibold mb-2">Distribución por grupo matricial</h3>{resumen.distribucionPorGrupo.map((g) => <p key={g.grupo} className="text-sm text-slate-700">{g.grupo}: {g.valor.toLocaleString('es-CO')} ({g.porcentaje.toFixed(1)} %)</p>)}</div>
      <div><h3 className="text-sm font-semibold mb-2">Participación de cada costo</h3>{resumen.participacionPorElemento.map((e) => <p key={e.elementoId} className="text-sm text-slate-700">{e.nombre}: {e.valor.toLocaleString('es-CO')} ({e.porcentaje.toFixed(1)} %)</p>)}</div>
    </div>
  </section>;
}

function Tarjeta({ titulo, valor }: { titulo: string; valor: number }) {
  return <div className="rounded-lg border bg-slate-50 p-3"><p className="text-xs text-slate-500">{titulo}</p><p className="text-lg font-semibold">{valor.toLocaleString('es-CO')}</p></div>;
}
