import { Proyecto, ProyectoEntrada } from '@/tipos/proyecto';

const proyectosSemilla: Proyecto[] = [
  {
    id: '1',
    cliente: 'Compañía Andina de Servicios',
    nombreProyecto: 'Optimización de mesa de ayuda nacional',
    tipoOperacion: 'Mesa de ayuda',
    responsable: 'Laura Mendoza',
    fecha: '2026-05-23',
    moneda: 'USD',
    cantidadCasosMensuales: 18000,
    observaciones: 'Proyecto inicial para homologar procesos de atención.',
    creadoEn: '2026-05-23T09:00:00Z',
  },
];

let proyectos: Proyecto[] = [...proyectosSemilla];

export function listarProyectos(): Proyecto[] {
  return [...proyectos].sort((a, b) => b.creadoEn.localeCompare(a.creadoEn));
}

export function obtenerProyectoPorId(id: string): Proyecto | null {
  return proyectos.find((proyecto) => proyecto.id === id) ?? null;
}

export function crearProyecto(entrada: ProyectoEntrada): Proyecto {
  const nuevo: Proyecto = {
    ...entrada,
    id: crypto.randomUUID(),
    creadoEn: new Date().toISOString(),
  };
  proyectos.push(nuevo);
  return nuevo;
}

export function actualizarProyecto(id: string, entrada: ProyectoEntrada): Proyecto | null {
  const indice = proyectos.findIndex((proyecto) => proyecto.id === id);
  if (indice === -1) return null;

  const actualizado: Proyecto = {
    ...proyectos[indice],
    ...entrada,
  };

  proyectos[indice] = actualizado;
  return actualizado;
}

export function eliminarProyecto(id: string): boolean {
  const longitudInicial = proyectos.length;
  proyectos = proyectos.filter((proyecto) => proyecto.id !== id);
  return proyectos.length < longitudInicial;
}
