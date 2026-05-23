'use client';

import { useMemo, useState } from 'react';
import { FormularioCostosActuales } from '@/componentes/operacion-actual/FormularioCostosActuales';
import { FormularioIndicadoresOperativos } from '@/componentes/operacion-actual/FormularioIndicadoresOperativos';
import { ResumenOperacionActual } from '@/componentes/operacion-actual/ResumenOperacionActual';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { guardarOperacionActual, obtenerOperacionActual } from '@/modulos/operacion-actual/repositorio-operacion-actual';
import { validarOperacionActual } from '@/modulos/operacion-actual/validaciones-operacion-actual';
import { OperacionActualEntrada } from '@/tipos/operacion-actual';

const VALORES_INICIALES: OperacionActualEntrada = {
  costosActuales: {
    talentoHumano: 0,
    tecnologia: 0,
    operacion: 0,
    infraestructura: 0,
    telefonia: 0,
    servicios: 0,
    consultoria: 0,
    otros: 0,
  },
  indicadoresOperativos: {
    cantidadCasos: 0,
    interaccionesMensuales: 0,
    tiempoPromedioAtencion: 0,
    nivelServicio: 0,
    porcentajeAbandono: 0,
    productividad: 0,
    personasRequeridas: 0,
    casosPorAgente: 0,
    casosPendientes: 0,
    reprocesos: 0,
    nivelAutomatizacion: 0,
  },
};

export default function PaginaOperacionActual({ params }: { params: { proyectoId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const [formulario, setFormulario] = useState<OperacionActualEntrada>(() => {
    const existente = obtenerOperacionActual(params.proyectoId);
    return existente
      ? { costosActuales: existente.costosActuales, indicadoresOperativos: existente.indicadoresOperativos }
      : VALORES_INICIALES;
  });
  const [errores, setErrores] = useState<ReturnType<typeof validarOperacionActual>>([]);
  const [mensaje, setMensaje] = useState('');
  const operacionActual = obtenerOperacionActual(params.proyectoId);

  if (!proyecto) {
    return <main className="p-6 text-sm text-red-700">No se encontró el proyecto solicitado.</main>;
  }

  function guardar() {
    const erroresValidados = validarOperacionActual(formulario);
    setErrores(erroresValidados);
    if (erroresValidados.length > 0) {
      setMensaje('Revise los campos con error antes de guardar.');
      return;
    }

    guardarOperacionActual(params.proyectoId, formulario);
    setMensaje('La operación actual se guardó correctamente y quedó asociada al proyecto.');
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Operación Actual</h1>
          <p className="mt-1 text-slate-200">Proyecto: {proyecto.nombreProyecto} — Cliente: {proyecto.cliente}</p>
        </header>

        <ResumenOperacionActual operacionActual={operacionActual} />

        <FormularioCostosActuales
          valor={formulario.costosActuales}
          errores={errores}
          alCambiar={(costosActuales) => setFormulario({ ...formulario, costosActuales })}
        />

        <FormularioIndicadoresOperativos
          valor={formulario.indicadoresOperativos}
          errores={errores}
          alCambiar={(indicadoresOperativos) => setFormulario({ ...formulario, indicadoresOperativos })}
        />

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={guardar} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Guardar operación actual</button>
            {mensaje && <p className="text-sm text-slate-700">{mensaje}</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
