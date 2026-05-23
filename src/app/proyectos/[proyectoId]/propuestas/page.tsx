'use client';

import { useMemo, useState } from 'react';
import { DetallePropuesta } from '@/componentes/propuestas/DetallePropuesta';
import { FormularioPropuesta } from '@/componentes/propuestas/FormularioPropuesta';
import { TablaPropuestas } from '@/componentes/propuestas/TablaPropuestas';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { actualizarPropuesta, crearPropuesta, duplicarPropuesta, eliminarPropuesta, listarPropuestasPorProyecto, obtenerPropuesta } from '@/modulos/propuestas-dinamicas/repositorio-propuestas';
import { validarPropuesta } from '@/modulos/propuestas-dinamicas/validaciones-propuesta';
import { Propuesta, PropuestaEntrada } from '@/tipos/propuesta';

const VALOR_INICIAL: PropuestaEntrada = {
  nombrePropuesta: '',
  descripcion: '',
  tipoPropuesta: 'Operación interna optimizada',
  proveedorPrincipal: '',
  anioInicial: new Date().getFullYear(),
  horizonteAnalisis: 3,
  observaciones: '',
};

export default function PaginaPropuestas({ params }: { params: { proyectoId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const [propuestas, setPropuestas] = useState<Propuesta[]>(listarPropuestasPorProyecto(params.proyectoId));
  const [seleccionadaId, setSeleccionadaId] = useState<string | null>(propuestas[0]?.id ?? null);
  const [edicionId, setEdicionId] = useState<string | null>(null);
  const [formulario, setFormulario] = useState<PropuestaEntrada>(VALOR_INICIAL);
  const [errores, setErrores] = useState<ReturnType<typeof validarPropuesta>>([]);

  if (!proyecto) {
    return <main className="p-6 text-sm text-red-700">No se encontró el proyecto solicitado.</main>;
  }

  const propuestaSeleccionada = seleccionadaId ? obtenerPropuesta(params.proyectoId, seleccionadaId) : null;

  function refrescar() {
    const lista = listarPropuestasPorProyecto(params.proyectoId);
    setPropuestas(lista);
    if (!lista.some((propuesta) => propuesta.id === seleccionadaId)) {
      setSeleccionadaId(lista[0]?.id ?? null);
    }
  }

  function prepararCrear() {
    setEdicionId(null);
    setFormulario(VALOR_INICIAL);
    setErrores([]);
  }

  function prepararEditar(id: string) {
    const propuesta = obtenerPropuesta(params.proyectoId, id);
    if (!propuesta) return;
    setEdicionId(id);
    setFormulario({
      nombrePropuesta: propuesta.nombrePropuesta,
      descripcion: propuesta.descripcion,
      tipoPropuesta: propuesta.tipoPropuesta,
      proveedorPrincipal: propuesta.proveedorPrincipal,
      anioInicial: propuesta.anioInicial,
      horizonteAnalisis: propuesta.horizonteAnalisis,
      observaciones: propuesta.observaciones,
    });
    setErrores([]);
  }

  function guardar() {
    const erroresValidados = validarPropuesta(formulario);
    setErrores(erroresValidados);
    if (erroresValidados.length > 0) return;

    if (edicionId) {
      actualizarPropuesta(params.proyectoId, edicionId, formulario);
      setSeleccionadaId(edicionId);
    } else {
      const nueva = crearPropuesta(params.proyectoId, formulario);
      setSeleccionadaId(nueva.id);
    }

    refrescar();
    setEdicionId(null);
    setFormulario(VALOR_INICIAL);
  }

  function duplicar(id: string) {
    const nueva = duplicarPropuesta(params.proyectoId, id);
    if (!nueva) return;
    setSeleccionadaId(nueva.id);
    refrescar();
  }

  function eliminar(id: string) {
    if (!window.confirm('¿Está seguro de eliminar esta propuesta?')) return;
    eliminarPropuesta(params.proyectoId, id);
    refrescar();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Propuestas Dinámicas</h1>
          <p className="mt-1 text-slate-200">Proyecto: {proyecto.nombreProyecto} — Cliente: {proyecto.cliente}</p>
        </header>

        <div className="flex justify-end">
          <button onClick={prepararCrear} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">Crear propuesta</button>
        </div>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <TablaPropuestas propuestas={propuestas} alVer={setSeleccionadaId} alEditar={prepararEditar} alDuplicar={duplicar} alEliminar={eliminar} />
          </div>
          <DetallePropuesta propuesta={propuestaSeleccionada} />
        </section>

        <FormularioPropuesta
          valor={formulario}
          errores={errores}
          titulo={edicionId ? 'Editar propuesta' : 'Crear propuesta'}
          textoBoton={edicionId ? 'Guardar cambios' : 'Registrar propuesta'}
          alCambiar={setFormulario}
          alGuardar={guardar}
          alCancelar={() => {
            setEdicionId(null);
            setFormulario(VALOR_INICIAL);
            setErrores([]);
          }}
        />
      </div>
    </main>
  );
}
