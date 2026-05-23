'use client';

import { useMemo } from 'react';
import { GraficasEjecutivasSimples } from '@/componentes/panel-ejecutivo/GraficasEjecutivasSimples';
import { ResumenOperacionActualEjecutivo } from '@/componentes/panel-ejecutivo/ResumenOperacionActualPanel';
import { TablaComparativaEjecutiva } from '@/componentes/panel-ejecutivo/TablaComparativaEjecutiva';
import { TarjetasIndicadoresPrincipales } from '@/componentes/panel-ejecutivo/TarjetasIndicadoresPrincipales';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { construirPanelEjecutivoComparativo } from '@/modulos/panel-ejecutivo/servicio-panel-ejecutivo';

export default function PaginaPanelEjecutivo({ params }: { params: { proyectoId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const panel = useMemo(() => construirPanelEjecutivoComparativo(params.proyectoId), [params.proyectoId]);

  if (!proyecto) return <main className="p-6 text-sm text-red-700">No se encontró el proyecto solicitado.</main>;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Panel Ejecutivo Comparativo</h1>
          <p className="mt-1 text-slate-200">Proyecto: {proyecto.nombreProyecto} — Cliente: {proyecto.cliente}</p>
        </header>

        <ResumenOperacionActualEjecutivo resumen={panel.resumenOperacionActual} />
        <TarjetasIndicadoresPrincipales panel={panel} />

        {panel.propuestas.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">No hay propuestas para comparar en el panel ejecutivo.</section>
        ) : (
          <>
            <TablaComparativaEjecutiva propuestas={panel.propuestas} mejorPropuestaId={panel.mejorPropuestaId} />
            <GraficasEjecutivasSimples panel={panel} proyectoId={params.proyectoId} />
          </>
        )}
      </div>
    </main>
  );
}
