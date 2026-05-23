import { IndicadoresOperativosActuales } from '@/tipos/operacion-actual';
import { ErrorOperacionActual } from '@/modulos/operacion-actual/validaciones-operacion-actual';

interface Props {
  valor: IndicadoresOperativosActuales;
  errores: ErrorOperacionActual[];
  alCambiar: (valor: IndicadoresOperativosActuales) => void;
}

function buscarError(campo: string, errores: ErrorOperacionActual[]) {
  return errores.find((error) => error.campo === campo)?.mensaje;
}

function CampoNumero({ etiqueta, valor, onChange, error }: { etiqueta: string; valor: number; onChange: (valor: number) => void; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{etiqueta}</span>
      <input className="input" type="number" min={0} value={valor} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function FormularioIndicadoresOperativos({ valor, errores, alCambiar }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Indicadores operativos actuales</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CampoNumero etiqueta="Cantidad de casos" valor={valor.cantidadCasos} onChange={(v) => alCambiar({ ...valor, cantidadCasos: v })} error={buscarError('indicadoresOperativos.cantidadCasos', errores)} />
        <CampoNumero etiqueta="Interacciones mensuales" valor={valor.interaccionesMensuales} onChange={(v) => alCambiar({ ...valor, interaccionesMensuales: v })} error={buscarError('indicadoresOperativos.interaccionesMensuales', errores)} />
        <CampoNumero etiqueta="Tiempo promedio de atención" valor={valor.tiempoPromedioAtencion} onChange={(v) => alCambiar({ ...valor, tiempoPromedioAtencion: v })} error={buscarError('indicadoresOperativos.tiempoPromedioAtencion', errores)} />
        <CampoNumero etiqueta="Nivel de servicio" valor={valor.nivelServicio} onChange={(v) => alCambiar({ ...valor, nivelServicio: v })} error={buscarError('indicadoresOperativos.nivelServicio', errores)} />
        <CampoNumero etiqueta="Porcentaje de abandono" valor={valor.porcentajeAbandono} onChange={(v) => alCambiar({ ...valor, porcentajeAbandono: v })} error={buscarError('indicadoresOperativos.porcentajeAbandono', errores)} />
        <CampoNumero etiqueta="Productividad" valor={valor.productividad} onChange={(v) => alCambiar({ ...valor, productividad: v })} error={buscarError('indicadoresOperativos.productividad', errores)} />
        <CampoNumero etiqueta="Personas requeridas" valor={valor.personasRequeridas} onChange={(v) => alCambiar({ ...valor, personasRequeridas: v })} error={buscarError('indicadoresOperativos.personasRequeridas', errores)} />
        <CampoNumero etiqueta="Casos por agente" valor={valor.casosPorAgente} onChange={(v) => alCambiar({ ...valor, casosPorAgente: v })} error={buscarError('indicadoresOperativos.casosPorAgente', errores)} />
        <CampoNumero etiqueta="Casos pendientes" valor={valor.casosPendientes} onChange={(v) => alCambiar({ ...valor, casosPendientes: v })} error={buscarError('indicadoresOperativos.casosPendientes', errores)} />
        <CampoNumero etiqueta="Reprocesos" valor={valor.reprocesos} onChange={(v) => alCambiar({ ...valor, reprocesos: v })} error={buscarError('indicadoresOperativos.reprocesos', errores)} />
        <CampoNumero etiqueta="Nivel de automatización" valor={valor.nivelAutomatizacion} onChange={(v) => alCambiar({ ...valor, nivelAutomatizacion: v })} error={buscarError('indicadoresOperativos.nivelAutomatizacion', errores)} />
      </div>
    </section>
  );
}
