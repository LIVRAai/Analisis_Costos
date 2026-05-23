'use client';

import { useMemo, useState } from 'react';
import { VistaPreviaReporte } from '@/componentes/exportaciones/VistaPreviaReporte';
import { exportarExcel } from '@/modulos/exportaciones/exportador-excel';
import { exportarPdf } from '@/modulos/exportaciones/exportador-pdf';
import { PLANTILLA_EJECUTIVA_BASE } from '@/modulos/exportaciones/plantillas-exportacion';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { listarPropuestasPorProyecto } from '@/modulos/propuestas-dinamicas/repositorio-propuestas';
import { construirReporteEjecutivo } from '@/modulos/exportaciones/constructor-reporte-ejecutivo';

export default function PaginaExportaciones({ params }: { params: { proyectoId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const propuestas = useMemo(() => listarPropuestasPorProyecto(params.proyectoId), [params.proyectoId]);
  const [seleccionadas, setSeleccionadas] = useState<string[]>(propuestas.map((p) => p.id));

  if (!proyecto) return <main className="p-6 text-sm text-red-700">No se encontró el proyecto solicitado.</main>;

  const reporte = construirReporteEjecutivo(params.proyectoId, seleccionadas);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Exportación y Reportes Ejecutivos</h1>
          <p className="mt-1 text-slate-200">Plantilla activa: {PLANTILLA_EJECUTIVA_BASE.nombre} (versión {PLANTILLA_EJECUTIVA_BASE.version})</p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Selección de propuestas a exportar</h2>
          {propuestas.length === 0 ? <p className="text-sm text-slate-600">No hay propuestas disponibles.</p> : propuestas.map((p) => (
            <label key={p.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={seleccionadas.includes(p.id)}
                onChange={(e) => setSeleccionadas((prev) => e.target.checked ? [...prev, p.id] : prev.filter((id) => id !== p.id))}
              />
              {p.nombrePropuesta}
            </label>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white" onClick={() => exportarExcel(params.proyectoId, seleccionadas)}>Exportar a Excel</button>
            <button className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white" onClick={() => exportarPdf(params.proyectoId, seleccionadas)}>Exportar a PDF</button>
          </div>
        </section>

        <VistaPreviaReporte reporte={reporte} />
      </div>
    </main>
  );
}
