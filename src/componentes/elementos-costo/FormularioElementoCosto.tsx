'use client';

import { ErrorElementoCosto } from '@/modulos/elementos-costo/validaciones-elementos-costo';
import { ElementoCostoEntrada, MonedaCosto, NaturalezaCosto, PeriodicidadCosto, TipoAplicacionCosto, TipoCosto } from '@/tipos/elemento-costo';

const TIPOS_COSTO: TipoCosto[] = ['Talento humano', 'Tecnología', 'Operación', 'Infraestructura', 'Telefonía', 'Servicios', 'Consultoría', 'Otros'];
const NATURALEZAS: NaturalezaCosto[] = ['Fijo', 'Variable'];
const PERIODICIDADES: PeriodicidadCosto[] = ['Mensual', 'Anual', 'Única vez'];
const TIPOS_APLICACION: TipoAplicacionCosto[] = ['Inversión inicial', 'Operación mensual'];
const MONEDAS: MonedaCosto[] = ['USD', 'EUR', 'COP', 'MXN'];

export function FormularioElementoCosto({ valor, errores, titulo, alCambiar, alGuardar, alCancelar }: { valor: ElementoCostoEntrada; errores: ErrorElementoCosto[]; titulo: string; alCambiar: (v: ElementoCostoEntrada) => void; alGuardar: () => void; alCancelar: () => void; }) {
  const e = (campo: keyof ElementoCostoEntrada) => errores.find((x) => x.campo === campo)?.mensaje;
  const set = <K extends keyof ElementoCostoEntrada>(campo: K, v: ElementoCostoEntrada[K]) => alCambiar({ ...valor, [campo]: v });

  const campo = (etiqueta: string, nodo: React.ReactNode, error?: string) => <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">{etiqueta}</span>{nodo}{error && <span className="text-xs text-red-600">{error}</span>}</label>;

  return <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold">{titulo}</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {campo('Nombre', <input className="input" value={valor.nombre} onChange={(x) => set('nombre', x.target.value)} />, e('nombre'))}
      {campo('Proveedor', <input className="input" value={valor.proveedor} onChange={(x) => set('proveedor', x.target.value)} />, e('proveedor'))}
      {campo('Grupo matricial', <input className="input" value={valor.grupoMatricial} onChange={(x) => set('grupoMatricial', x.target.value)} />, e('grupoMatricial'))}
      {campo('Subgrupo matricial', <input className="input" value={valor.subgrupoMatricial} onChange={(x) => set('subgrupoMatricial', x.target.value)} />, e('subgrupoMatricial'))}
      {campo('Tipo de costo', <select className="input" value={valor.tipoCosto} onChange={(x) => set('tipoCosto', x.target.value as TipoCosto)}>{TIPOS_COSTO.map((t) => <option key={t} value={t}>{t}</option>)}</select>)}
      {campo('Naturaleza del costo', <select className="input" value={valor.naturalezaCosto} onChange={(x) => set('naturalezaCosto', x.target.value as NaturalezaCosto)}>{NATURALEZAS.map((t) => <option key={t} value={t}>{t}</option>)}</select>)}
      {campo('Periodicidad', <select className="input" value={valor.periodicidad} onChange={(x) => set('periodicidad', x.target.value as PeriodicidadCosto)}>{PERIODICIDADES.map((t) => <option key={t} value={t}>{t}</option>)}</select>)}
      {campo('Valor', <input type="number" min={0} className="input" value={valor.valor} onChange={(x) => set('valor', Number(x.target.value))} />, e('valor'))}
      {campo('Moneda', <select className="input" value={valor.moneda} onChange={(x) => set('moneda', x.target.value as MonedaCosto)}>{MONEDAS.map((t) => <option key={t} value={t}>{t}</option>)}</select>)}
      {campo('Tipo de aplicación', <select className="input" value={valor.tipoAplicacion} onChange={(x) => set('tipoAplicacion', x.target.value as TipoAplicacionCosto)}>{TIPOS_APLICACION.map((t) => <option key={t} value={t}>{t}</option>)}</select>)}
      {campo('Tiempo de amortización (meses)', <input type="number" min={0} className="input" value={valor.tiempoAmortizacion} onChange={(x) => set('tiempoAmortizacion', Number(x.target.value))} />, e('tiempoAmortizacion'))}
      {campo('Año de aplicación', <select className="input" value={valor.anioAplicacion} onChange={(x) => set('anioAplicacion', Number(x.target.value) as 1|2|3)}><option value={1}>Año 1</option><option value={2}>Año 2</option><option value={3}>Año 3</option></select>)}
    </div>
    <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={valor.amortizable} onChange={(x) => set('amortizable', x.target.checked)} />Costo amortizable</label>
    <label className="mt-4 block"><span className="mb-1 block text-sm font-medium text-slate-700">Observaciones</span><textarea className="input min-h-20" value={valor.observaciones} onChange={(x) => set('observaciones', x.target.value)} /></label>
    <div className="mt-4 flex gap-3"><button onClick={alGuardar} className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Guardar elemento</button><button onClick={alCancelar} className="rounded-md border border-slate-300 px-4 py-2 text-sm">Cancelar</button></div>
  </section>;
}
