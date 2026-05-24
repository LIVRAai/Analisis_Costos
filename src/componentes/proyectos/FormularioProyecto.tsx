'use client';

import { ProyectoEntrada } from '@/tipos/proyecto';
import { ErrorFormularioProyecto } from '@/modulos/gestion-proyectos/validaciones';

interface Props {
  valor: ProyectoEntrada;
  errores: ErrorFormularioProyecto[];
  titulo: string;
  textoBoton: string;
  alCambiar: (valor: ProyectoEntrada) => void;
  alEnviar: () => void;
  alCancelar?: () => void;
}

const MONEDAS = ['USD', 'EUR', 'COP', 'MXN'] as const;

function errorDe(campo: keyof ProyectoEntrada, errores: ErrorFormularioProyecto[]) {
  return errores.find((error) => error.campo === campo)?.mensaje;
}

export function FormularioProyecto({ valor, errores, titulo, textoBoton, alCambiar, alEnviar, alCancelar }: Props) {
  const actualizarCampo = <K extends keyof ProyectoEntrada>(campo: K, campoValor: ProyectoEntrada[K]) => {
    alCambiar({ ...valor, [campo]: campoValor });
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{titulo}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Campo etiqueta="Cliente" obligatorio error={errorDe('cliente', errores)}>
          <input className="input" value={valor.cliente} onChange={(e) => actualizarCampo('cliente', e.target.value)} />
        </Campo>
        <Campo etiqueta="Nombre del proyecto" obligatorio error={errorDe('nombreProyecto', errores)}>
          <input className="input" value={valor.nombreProyecto} onChange={(e) => actualizarCampo('nombreProyecto', e.target.value)} />
        </Campo>
        <Campo etiqueta="Tipo de operación" obligatorio error={errorDe('tipoOperacion', errores)}>
          <input className="input" value={valor.tipoOperacion} onChange={(e) => actualizarCampo('tipoOperacion', e.target.value)} />
        </Campo>
        <Campo etiqueta="Responsable" obligatorio error={errorDe('responsable', errores)}>
          <input className="input" value={valor.responsable} onChange={(e) => actualizarCampo('responsable', e.target.value)} />
        </Campo>
        <Campo etiqueta="Fecha" obligatorio error={errorDe('fecha', errores)}>
          <input type="date" className="input" value={valor.fecha} onChange={(e) => actualizarCampo('fecha', e.target.value)} />
        </Campo>
        <Campo etiqueta="Moneda" obligatorio error={errorDe('moneda', errores)}>
          <select className="input" value={valor.moneda} onChange={(e) => actualizarCampo('moneda', e.target.value as ProyectoEntrada['moneda'])}>
            {MONEDAS.map((moneda) => (
              <option key={moneda} value={moneda}>{moneda}</option>
            ))}
          </select>
        </Campo>
        <Campo etiqueta="Cantidad de casos mensuales" obligatorio error={errorDe('cantidadCasosMensuales', errores)}>
          <input type="number" min={1} className="input" value={valor.cantidadCasosMensuales} onChange={(e) => actualizarCampo('cantidadCasosMensuales', Number(e.target.value))} />
        </Campo>
      </div>
      <Campo etiqueta="Observaciones" className="mt-4">
        <textarea className="input min-h-24" value={valor.observaciones} onChange={(e) => actualizarCampo('observaciones', e.target.value)} />
      </Campo>

      <div className="mt-5 flex gap-3">
        <button onClick={alEnviar} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">{textoBoton}</button>
        {alCancelar && (
          <button onClick={alCancelar} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Cancelar</button>
        )}
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
