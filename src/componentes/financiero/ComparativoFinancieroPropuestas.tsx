import { ResultadoFinancieroPropuesta } from '@/tipos/financiero';

function v(v: number | null) {
  return v === null ? 'No disponible' : v.toLocaleString('es-CO', { maximumFractionDigits: 2 });
}

export function ComparativoFinancieroPropuestas({ resultados, alSeleccionar }: { resultados: ResultadoFinancieroPropuesta[]; alSeleccionar: (propuestaId: string) => void }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Vista comparativa entre propuestas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Propuesta</th><th>Costo mensual</th><th>Ahorro mensual</th><th>Variación porcentual</th><th>Retorno de inversión</th><th>Tiempo de recuperación</th><th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r) => (
              <tr key={r.propuestaId} className="border-b border-slate-100 text-slate-800">
                <td className="py-2">{r.nombrePropuesta}</td>
                <td>{r.costoMensualPropuesta.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{r.ahorroMensual.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</td>
                <td>{v(r.variacionPorcentual.valor)}{r.variacionPorcentual.valor !== null ? ' %' : ''}</td>
                <td>{v(r.retornoInversion.valor)}{r.retornoInversion.valor !== null ? ' %' : ''}</td>
                <td>{v(r.tiempoRecuperacion.valor)}</td>
                <td className="text-right"><button className="boton-secundario" onClick={() => alSeleccionar(r.propuestaId)}>Ver resumen</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
