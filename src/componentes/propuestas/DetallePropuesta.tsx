import { Propuesta } from '@/tipos/propuesta';

export function DetallePropuesta({ propuesta }: { propuesta: Propuesta | null }) {
  if (!propuesta) {
    return <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">Seleccione una propuesta para ver el detalle.</section>;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Detalle de propuesta</h2>
      <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
        <Item etiqueta="Nombre de la propuesta" valor={propuesta.nombrePropuesta} />
        <Item etiqueta="Tipo de propuesta" valor={propuesta.tipoPropuesta} />
        <Item etiqueta="Proveedor principal" valor={propuesta.proveedorPrincipal} />
        <Item etiqueta="Año inicial" valor={String(propuesta.anioInicial)} />
        <Item etiqueta="Horizonte de análisis" valor={`${propuesta.horizonteAnalisis} años`} />
      </dl>
      <div className="mt-3 text-sm space-y-2">
        <div><p className="font-medium text-slate-700">Descripción</p><p className="text-slate-600">{propuesta.descripcion}</p></div>
        <div><p className="font-medium text-slate-700">Observaciones</p><p className="text-slate-600">{propuesta.observaciones || 'Sin observaciones.'}</p></div>
      </div>
    </section>
  );
}

function Item({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return <div><dt className="text-slate-500">{etiqueta}</dt><dd className="font-medium text-slate-800">{valor}</dd></div>;
}
