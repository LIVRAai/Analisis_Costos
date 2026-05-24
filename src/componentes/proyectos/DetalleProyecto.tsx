import { Proyecto } from '@/tipos/proyecto';

export function DetalleProyecto({ proyecto }: { proyecto: Proyecto | null }) {
  if (!proyecto) {
    return <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">Seleccione un proyecto para ver su detalle.</section>;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Detalle del proyecto</h2>
      <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
        <Item etiqueta="Cliente" valor={proyecto.cliente} />
        <Item etiqueta="Nombre del proyecto" valor={proyecto.nombreProyecto} />
        <Item etiqueta="Tipo de operación" valor={proyecto.tipoOperacion} />
        <Item etiqueta="Responsable" valor={proyecto.responsable} />
        <Item etiqueta="Fecha" valor={proyecto.fecha} />
        <Item etiqueta="Moneda" valor={proyecto.moneda} />
        <Item etiqueta="Cantidad de casos mensuales" valor={proyecto.cantidadCasosMensuales.toLocaleString('es-CO')} />
      </dl>
      <div className="mt-3 text-sm">
        <p className="font-medium text-slate-700">Observaciones</p>
        <p className="text-slate-600">{proyecto.observaciones || 'Sin observaciones.'}</p>
      </div>
    </section>
  );
}

function Item({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return <div><dt className="text-slate-500">{etiqueta}</dt><dd className="font-medium text-slate-800">{valor}</dd></div>;
}
