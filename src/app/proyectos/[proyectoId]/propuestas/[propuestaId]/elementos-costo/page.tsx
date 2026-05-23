'use client';

import { useMemo, useState } from 'react';
import { FormularioElementoCosto } from '@/componentes/elementos-costo/FormularioElementoCosto';
import { ResumenCostosVista } from '@/componentes/elementos-costo/ResumenCostos';
import { TablaElementosCosto } from '@/componentes/elementos-costo/TablaElementosCosto';
import { calcularResumenCostos } from '@/modulos/elementos-costo/calculos-elementos-costo';
import { actualizarElementoCosto, crearElementoCosto, eliminarElementoCosto, listarElementosCosto, obtenerElementoCosto } from '@/modulos/elementos-costo/repositorio-elementos-costo';
import { validarElementoCosto } from '@/modulos/elementos-costo/validaciones-elementos-costo';
import { obtenerProyectoPorId } from '@/modulos/gestion-proyectos/repositorio-proyectos';
import { obtenerPropuesta } from '@/modulos/propuestas-dinamicas/repositorio-propuestas';
import { ElementoCosto, ElementoCostoEntrada } from '@/tipos/elemento-costo';

const INICIAL: ElementoCostoEntrada = {
  nombre: '', proveedor: '', grupoMatricial: '', subgrupoMatricial: '', tipoCosto: 'Tecnología', naturalezaCosto: 'Fijo', periodicidad: 'Mensual', valor: 0, moneda: 'USD', tipoAplicacion: 'Operación mensual', amortizable: false, tiempoAmortizacion: 0, anioAplicacion: 1, observaciones: '',
};

export default function PaginaElementosCosto({ params }: { params: { proyectoId: string; propuestaId: string } }) {
  const proyecto = useMemo(() => obtenerProyectoPorId(params.proyectoId), [params.proyectoId]);
  const propuesta = useMemo(() => obtenerPropuesta(params.proyectoId, params.propuestaId), [params.proyectoId, params.propuestaId]);
  const [elementos, setElementos] = useState<ElementoCosto[]>(listarElementosCosto(params.proyectoId, params.propuestaId));
  const [edicionId, setEdicionId] = useState<string | null>(null);
  const [formulario, setFormulario] = useState<ElementoCostoEntrada>(INICIAL);
  const [errores, setErrores] = useState<ReturnType<typeof validarElementoCosto>>([]);

  if (!proyecto || !propuesta) return <main className="p-6 text-sm text-red-700">No se encontró el proyecto o propuesta seleccionada.</main>;

  const resumen = calcularResumenCostos(elementos);

  function recargar() {
    setElementos(listarElementosCosto(params.proyectoId, params.propuestaId));
  }

  function guardar() {
    const e = validarElementoCosto(formulario);
    setErrores(e);
    if (e.length) return;
    if (edicionId) {
      actualizarElementoCosto(params.proyectoId, params.propuestaId, edicionId, formulario);
    } else {
      crearElementoCosto(params.proyectoId, params.propuestaId, formulario);
    }
    recargar();
    setEdicionId(null);
    setFormulario(INICIAL);
  }

  function editar(id: string) {
    const item = obtenerElementoCosto(params.proyectoId, params.propuestaId, id);
    if (!item) return;
    setEdicionId(id);
    const { id: _, creadoEn, proyectoId, propuestaId, ...entrada } = item;
    setFormulario(entrada);
  }

  function eliminar(id: string) {
    if (!window.confirm('¿Está seguro de eliminar este elemento de costo?')) return;
    eliminarElementoCosto(params.proyectoId, params.propuestaId, id);
    recargar();
  }

  return <main className="min-h-screen bg-slate-50 px-6 py-8">
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="rounded-xl bg-slate-900 p-6 text-white shadow">
        <h1 className="text-2xl font-semibold">Elementos de Costo</h1>
        <p className="mt-1 text-slate-200">Proyecto: {proyecto.nombreProyecto} — Propuesta: {propuesta.nombrePropuesta}</p>
      </header>

      <ResumenCostosVista resumen={resumen} />

      <TablaElementosCosto elementos={elementos} alEditar={editar} alEliminar={eliminar} />

      <FormularioElementoCosto
        valor={formulario}
        errores={errores}
        titulo={edicionId ? 'Editar elemento de costo' : 'Crear elemento de costo'}
        alCambiar={setFormulario}
        alGuardar={guardar}
        alCancelar={() => {
          setEdicionId(null);
          setFormulario(INICIAL);
          setErrores([]);
        }}
      />
    </div>
  </main>;
}
