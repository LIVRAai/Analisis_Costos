import { PanelEjecutivoComparativo } from '@/tipos/panel-ejecutivo';

export function TarjetasIndicadoresPrincipales({ panel }: { panel: PanelEjecutivoComparativo }) {
  const mejor = panel.propuestas.find((p) => p.propuestaId === panel.mejorPropuestaId) ?? null;

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Tarjeta titulo="Costo mensual actual" valor={panel.resumenOperacionActual.costoMensualActual} />
      <Tarjeta titulo="Costo por caso actual" valor={panel.resumenOperacionActual.costoPorCasoActual} />
      <Tarjeta titulo="Mejor ahorro anual" valor={mejor?.ahorroAnual ?? null} />
      <Tarjeta titulo="Mejor retorno de inversión" valor={mejor?.retornoInversion ?? null} sufijo=" %" />
    </section>
  );
}

function Tarjeta({ titulo, valor, sufijo = '' }: { titulo: string; valor: number | null; sufijo?: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{titulo}</p>
      <p className="text-xl font-semibold text-slate-900">{valor === null ? 'No disponible' : `${valor.toLocaleString('es-CO', { maximumFractionDigits: 2 })}${sufijo}`}</p>
    </article>
  );
}
