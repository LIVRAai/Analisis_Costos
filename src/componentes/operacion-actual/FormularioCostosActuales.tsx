import { CostosActuales } from '@/tipos/operacion-actual';
import { ErrorOperacionActual } from '@/modulos/operacion-actual/validaciones-operacion-actual';

interface Props {
  valor: CostosActuales;
  errores: ErrorOperacionActual[];
  alCambiar: (valor: CostosActuales) => void;
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

export function FormularioCostosActuales({ valor, errores, alCambiar }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Costos actuales</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CampoNumero etiqueta="Talento humano" valor={valor.talentoHumano} onChange={(v) => alCambiar({ ...valor, talentoHumano: v })} error={buscarError('costosActuales.talentoHumano', errores)} />
        <CampoNumero etiqueta="Tecnología" valor={valor.tecnologia} onChange={(v) => alCambiar({ ...valor, tecnologia: v })} error={buscarError('costosActuales.tecnologia', errores)} />
        <CampoNumero etiqueta="Operación" valor={valor.operacion} onChange={(v) => alCambiar({ ...valor, operacion: v })} error={buscarError('costosActuales.operacion', errores)} />
        <CampoNumero etiqueta="Infraestructura" valor={valor.infraestructura} onChange={(v) => alCambiar({ ...valor, infraestructura: v })} error={buscarError('costosActuales.infraestructura', errores)} />
        <CampoNumero etiqueta="Telefonía" valor={valor.telefonia} onChange={(v) => alCambiar({ ...valor, telefonia: v })} error={buscarError('costosActuales.telefonia', errores)} />
        <CampoNumero etiqueta="Servicios" valor={valor.servicios} onChange={(v) => alCambiar({ ...valor, servicios: v })} error={buscarError('costosActuales.servicios', errores)} />
        <CampoNumero etiqueta="Consultoría" valor={valor.consultoria} onChange={(v) => alCambiar({ ...valor, consultoria: v })} error={buscarError('costosActuales.consultoria', errores)} />
        <CampoNumero etiqueta="Otros" valor={valor.otros} onChange={(v) => alCambiar({ ...valor, otros: v })} error={buscarError('costosActuales.otros', errores)} />
      </div>
    </section>
  );
}
