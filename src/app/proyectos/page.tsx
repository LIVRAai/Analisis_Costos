'use client';

import { useMemo, useState } from 'react';
import { DetalleProyecto } from '@/componentes/proyectos/DetalleProyecto';
import { FormularioProyecto } from '@/componentes/proyectos/FormularioProyecto';
import { TablaProyectos } from '@/componentes/proyectos/TablaProyectos';
import { actualizarProyecto, crearProyecto, eliminarProyecto, listarProyectos, obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { validarProyecto } from '@/modulos/gestion-proyectos/validaciones';
import { Proyecto, ProyectoEntrada } from '@/tipos/proyecto';

const VALOR_INICIAL: ProyectoEntrada = {
  cliente: '',
  nombreProyecto: '',
  tipoOperacion: '',
  responsable: '',
  fecha: '',
  moneda: 'USD',
  cantidadCasosMensuales: 0,
  observaciones: '',
};

export default function PaginaProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>(listarProyectos());
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(proyectos[0]?.id ?? null);
  const [modoEdicionId, setModoEdicionId] = useState<string | null>(null);
  const [formulario, setFormulario] = useState<ProyectoEntrada>(VALOR_INICIAL);
  const [errores, setErrores] = useState<ReturnType<typeof validarProyecto>>([]);

  const proyectoSeleccionado = useMemo(
    () => (seleccionadoId ? obtenerProyectoPorId(seleccionadoId) : null),
    [seleccionadoId, proyectos],
  );

  const proyectoEnEdicion = modoEdicionId ? obtenerProyectoPorId(modoEdicionId) : null;

  function abrirCrear() {
    setModoEdicionId(null);
    setFormulario(VALOR_INICIAL);
    setErrores([]);
  }

  function abrirEditar(id: string) {
    const proyecto = obtenerProyectoPorId(id);
    if (!proyecto) return;
    setModoEdicionId(id);
    setFormulario({
      cliente: proyecto.cliente,
      nombreProyecto: proyecto.nombreProyecto,
      tipoOperacion: proyecto.tipoOperacion,
      responsable: proyecto.responsable,
      fecha: proyecto.fecha,
      moneda: proyecto.moneda,
      cantidadCasosMensuales: proyecto.cantidadCasosMensuales,
      observaciones: proyecto.observaciones,
    });
    setErrores([]);
  }

  function guardarFormulario() {
    const erroresValidados = validarProyecto(formulario);
    setErrores(erroresValidados);
    if (erroresValidados.length > 0) return;

    if (modoEdicionId) {
      actualizarProyecto(modoEdicionId, formulario);
    } else {
      crearProyecto(formulario);
    }

    const actualizados = listarProyectos();
    setProyectos(actualizados);
    setSeleccionadoId(actualizados[0]?.id ?? null);
    setModoEdicionId(null);
    setFormulario(VALOR_INICIAL);
  }

  function eliminar(id: string) {
    const confirmar = window.confirm('¿Está seguro de eliminar este proyecto?');
    if (!confirmar) return;

    eliminarProyecto(id);
    const actualizados = listarProyectos();
    setProyectos(actualizados);
    if (seleccionadoId === id) setSeleccionadoId(actualizados[0]?.id ?? null);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Gestión de Proyectos</h1>
          <p className="mt-1 text-slate-200">Administre proyectos de análisis operacional con información estructurada y trazable.</p>
        </header>

        <div className="flex justify-end">
          <button onClick={abrirCrear} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">Crear proyecto</button>
        </div>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <TablaProyectos proyectos={proyectos} alVer={setSeleccionadoId} alEditar={abrirEditar} alEliminar={eliminar} />
          </div>
          <DetalleProyecto proyecto={proyectoSeleccionado} />
        </section>

        <FormularioProyecto
          valor={formulario}
          errores={errores}
          titulo={proyectoEnEdicion ? 'Editar proyecto' : 'Crear proyecto'}
          textoBoton={proyectoEnEdicion ? 'Guardar cambios' : 'Registrar proyecto'}
          alCambiar={setFormulario}
          alEnviar={guardarFormulario}
          alCancelar={() => {
            setModoEdicionId(null);
            setFormulario(VALOR_INICIAL);
            setErrores([]);
          }}
        />
      </div>
    </main>
  );
}
