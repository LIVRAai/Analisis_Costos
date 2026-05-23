import { OperacionActual, OperacionActualEntrada } from '@/tipos/operacion-actual';

const operacionesPorProyecto = new Map<string, OperacionActual>();

export function obtenerOperacionActual(proyectoId: string): OperacionActual | null {
  return operacionesPorProyecto.get(proyectoId) ?? null;
}

export function guardarOperacionActual(proyectoId: string, entrada: OperacionActualEntrada): OperacionActual {
  const registro: OperacionActual = {
    proyectoId,
    costosActuales: entrada.costosActuales,
    indicadoresOperativos: entrada.indicadoresOperativos,
    actualizadoEn: new Date().toISOString(),
  };

  operacionesPorProyecto.set(proyectoId, registro);
  return registro;
}
