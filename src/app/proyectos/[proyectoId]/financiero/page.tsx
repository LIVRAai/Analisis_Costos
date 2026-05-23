'use client';

import { useMemo, useState } from 'react';
import { ComparativoFinancieroPropuestas } from '@/componentes/financiero/ComparativoFinancieroPropuestas';
import { ResumenFinancieroPropuesta } from '@/componentes/financiero/ResumenFinancieroPropuesta';
import { calcularResultadoFinancieroProyecto } from '@/modulos/financiero/calculos-financieros';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';

export default function PaginaFinancieraProyecto({ params }: { params: { proyectoId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const comparativo = useMemo(() => calcularResultadoFinancieroProyecto(params.proyectoId), [params.proyectoId]);
  const [seleccionadaId, setSeleccionadaId] = useState<string | null>(comparativo.resultados[0]?.propuestaId ?? null);

  if (!proyecto) {
    return <main className="p-6 text-sm text-red-700">No se encontró el proyecto solicitado.</main>;
  }

  const seleccionada = comparativo.resultados.find((r) => r.propuestaId === seleccionadaId) ?? null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
          <h1 className="text-2xl font-semibold">Módulo Financiero</h1>
          <p className="mt-1 text-slate-200">Proyecto: {proyecto.nombreProyecto} — Cliente: {proyecto.cliente}</p>
        </header>

        {comparativo.resultados.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
            Aún no hay propuestas para comparar financieramente en este proyecto.
          </section>
        ) : (
          <>
            <ComparativoFinancieroPropuestas resultados={comparativo.resultados} alSeleccionar={setSeleccionadaId} />
            <ResumenFinancieroPropuesta resultado={seleccionada} />
          </>
        )}
      </div>
    </main>
  );
}
