import { OperacionActual } from '@/tipos/operacion-actual';

export function ResumenOperacionActual({ operacionActual }: { operacionActual: OperacionActual | null }) {
  if (!operacionActual) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Aún no existe información registrada de operación actual para este proyecto.
      </section>
    );
  }

  const totalCostos = Object.values(operacionActual.costosActuales).reduce((acumulado, valor) => acumulado + valor, 0);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Resumen de la operación actual</h2>
      <p className="mb-3 text-sm text-slate-600">Última actualización: {new Date(operacionActual.actualizadoEn).toLocaleString('es-CO')}</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Tarjeta titulo="Total costos actuales" valor={totalCostos.toLocaleString('es-CO')} />
        <Tarjeta titulo="Cantidad de casos" valor={operacionActual.indicadoresOperativos.cantidadCasos.toLocaleString('es-CO')} />
        <Tarjeta titulo="Nivel de servicio" valor={`${operacionActual.indicadoresOperativos.nivelServicio.toLocaleString('es-CO')} %`} />
      </div>
    </section>
  );
}

function Tarjeta({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{titulo}</p>
      <p className="text-lg font-semibold text-slate-900">{valor}</p>
    </div>
  );
}
