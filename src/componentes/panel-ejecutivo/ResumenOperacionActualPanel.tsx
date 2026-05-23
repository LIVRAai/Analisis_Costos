import { ResumenOperacionActualPanel } from '@/tipos/panel-ejecutivo';

export function ResumenOperacionActualEjecutivo({ resumen }: { resumen: ResumenOperacionActualPanel }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Resumen de operación actual</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 text-sm">
        <Item etiqueta="Costo mensual actual" valor={resumen.costoMensualActual} />
        <Item etiqueta="Costo anual actual" valor={resumen.costoAnualActual} />
        <Item etiqueta="Cantidad de casos" valor={resumen.cantidadCasos} />
        <Item etiqueta="Costo por caso actual" valor={resumen.costoPorCasoActual} />
      </div>
    </section>
  );
}

function Item({ etiqueta, valor }: { etiqueta: string; valor: number | null }) {
  return <div className="rounded-lg bg-slate-50 p-3 border border-slate-200"><p className="text-slate-500">{etiqueta}</p><p className="font-semibold text-slate-900">{valor === null ? 'No disponible' : valor.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</p></div>;
}
