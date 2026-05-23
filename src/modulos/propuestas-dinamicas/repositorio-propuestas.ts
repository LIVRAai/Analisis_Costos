import { Propuesta, PropuestaEntrada } from '@/tipos/propuesta';

const propuestasPorProyecto = new Map<string, Propuesta[]>();

export function listarPropuestasPorProyecto(proyectoId: string): Propuesta[] {
  return [...(propuestasPorProyecto.get(proyectoId) ?? [])].sort((a, b) => b.creadaEn.localeCompare(a.creadaEn));
}

export function obtenerPropuesta(proyectoId: string, propuestaId: string): Propuesta | null {
  const propuestas = propuestasPorProyecto.get(proyectoId) ?? [];
  return propuestas.find((propuesta) => propuesta.id === propuestaId) ?? null;
}

export function crearPropuesta(proyectoId: string, entrada: PropuestaEntrada): Propuesta {
  const nueva: Propuesta = {
    id: crypto.randomUUID(),
    proyectoId,
    creadaEn: new Date().toISOString(),
    ...entrada,
  };

  const propuestas = propuestasPorProyecto.get(proyectoId) ?? [];
  propuestasPorProyecto.set(proyectoId, [...propuestas, nueva]);
  return nueva;
}

export function actualizarPropuesta(proyectoId: string, propuestaId: string, entrada: PropuestaEntrada): Propuesta | null {
  const propuestas = propuestasPorProyecto.get(proyectoId) ?? [];
  const indice = propuestas.findIndex((propuesta) => propuesta.id === propuestaId);
  if (indice < 0) return null;

  const actualizada: Propuesta = { ...propuestas[indice], ...entrada };
  const copia = [...propuestas];
  copia[indice] = actualizada;
  propuestasPorProyecto.set(proyectoId, copia);
  return actualizada;
}

export function duplicarPropuesta(proyectoId: string, propuestaId: string): Propuesta | null {
  const original = obtenerPropuesta(proyectoId, propuestaId);
  if (!original) return null;

  return crearPropuesta(proyectoId, {
    nombrePropuesta: `${original.nombrePropuesta} (Copia)`,
    descripcion: original.descripcion,
    tipoPropuesta: original.tipoPropuesta,
    proveedorPrincipal: original.proveedorPrincipal,
    anioInicial: original.anioInicial,
    horizonteAnalisis: original.horizonteAnalisis,
    observaciones: original.observaciones,
  });
}

export function eliminarPropuesta(proyectoId: string, propuestaId: string): boolean {
  const propuestas = propuestasPorProyecto.get(proyectoId) ?? [];
  const filtradas = propuestas.filter((propuesta) => propuesta.id !== propuestaId);
  propuestasPorProyecto.set(proyectoId, filtradas);
  return filtradas.length !== propuestas.length;
}
