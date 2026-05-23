import { PropuestaPanel } from '@/tipos/panel-ejecutivo';

export function TablaComparativaEjecutiva({ propuestas, mejorPropuestaId }: { propuestas: PropuestaPanel[]; mejorPropuestaId: string | null }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Tabla comparativa de propuestas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Propuesta</th><th>Costo mensual</th><th>Ahorro mensual</th><th>Ahorro anual</th><th>Variación</th><th>Inversión inicial</th><th>Flujo acumulado año 3</th><th>Alerta</th>
            </tr>
          </thead>
          <tbody>
            {propuestas.map((p) => (
              <tr key={p.propuestaId} className={`border-b border-slate-100 ${p.propuestaId === mejorPropuestaId ? 'bg-emerald-50' : ''}`}>
                <td className="py-2 font-medium">{p.nombrePropuesta}{p.propuestaId === mejorPropuestaId ? ' (Mejor propuesta)' : ''}</td>
                <td>{p.costoMensualPropuesta.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{p.ahorroMensual.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{p.ahorroAnual.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{p.variacionPorcentual === null ? 'No disponible' : `${p.variacionPorcentual.toFixed(2)} %`}</td>
                <td>{p.inversionInicial.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{p.flujoAcumuladoAnio3.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{p.alertaSinAhorro ? <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">Sin ahorro</span> : <span className="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-800">Con ahorro</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
