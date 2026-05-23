'use client';

import { ErrorPropuesta } from '@/modulos/propuestas-dinamicas/validaciones-propuesta';
import { PropuestaEntrada, TipoPropuesta } from '@/tipos/propuesta';

const TIPOS_PROPUESTA: TipoPropuesta[] = [
  'Operación interna optimizada',
  'Operación tercerizada',
  'Operación híbrida',
  'Implementación tecnológica',
  'Automatización',
  'Otra',
];

interface Props {
  valor: PropuestaEntrada;
  errores: ErrorPropuesta[];
  titulo: string;
  textoBoton: string;
  alCambiar: (valor: PropuestaEntrada) => void;
  alGuardar: () => void;
  alCancelar: () => void;
}

function errorDe(campo: keyof PropuestaEntrada, errores: ErrorPropuesta[]) {
  return errores.find((error) => error.campo === campo)?.mensaje;
}

export function FormularioPropuesta({ valor, errores, titulo, textoBoton, alCambiar, alGuardar, alCancelar }: Props) {
  const actualizar = <K extends keyof PropuestaEntrada>(campo: K, nuevoValor: PropuestaEntrada[K]) => alCambiar({ ...valor, [campo]: nuevoValor });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{titulo}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Campo etiqueta="Nombre de la propuesta" obligatorio error={errorDe('nombrePropuesta', errores)}>
          <input className="input" value={valor.nombrePropuesta} onChange={(e) => actualizar('nombrePropuesta', e.target.value)} />
        </Campo>
        <Campo etiqueta="Tipo de propuesta" obligatorio error={errorDe('tipoPropuesta', errores)}>
          <select className="input" value={valor.tipoPropuesta} onChange={(e) => actualizar('tipoPropuesta', e.target.value as TipoPropuesta)}>
            {TIPOS_PROPUESTA.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Proveedor principal" obligatorio error={errorDe('proveedorPrincipal', errores)}>
          <input className="input" value={valor.proveedorPrincipal} onChange={(e) => actualizar('proveedorPrincipal', e.target.value)} />
        </Campo>
        <Campo etiqueta="Año inicial" obligatorio error={errorDe('anioInicial', errores)}>
          <input type="number" min={2000} className="input" value={valor.anioInicial} onChange={(e) => actualizar('anioInicial', Number(e.target.value))} />
        </Campo>
        <Campo etiqueta="Horizonte de análisis (años)" obligatorio error={errorDe('horizonteAnalisis', errores)}>
          <input type="number" min={1} className="input" value={valor.horizonteAnalisis} onChange={(e) => actualizar('horizonteAnalisis', Number(e.target.value))} />
        </Campo>
      </div>

      <Campo className="mt-4" etiqueta="Descripción" obligatorio error={errorDe('descripcion', errores)}>
        <textarea className="input min-h-24" value={valor.descripcion} onChange={(e) => actualizar('descripcion', e.target.value)} />
      </Campo>
      <Campo className="mt-4" etiqueta="Observaciones">
        <textarea className="input min-h-20" value={valor.observaciones} onChange={(e) => actualizar('observaciones', e.target.value)} />
      </Campo>

      <div className="mt-5 flex gap-3">
        <button onClick={alGuardar} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">{textoBoton}</button>
        <button onClick={alCancelar} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Cancelar</button>
      </div>
    </section>
  );
}

function Campo({ etiqueta, obligatorio, error, children, className }: { etiqueta: string; obligatorio?: boolean; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{etiqueta}{obligatorio ? ' *' : ''}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
