import { ElementoCosto, ElementoCostoEntrada } from '@/tipos/elemento-costo';

type Clave = `${string}:${string}`;

const almacenamiento = new Map<Clave, ElementoCosto[]>();

function clave(proyectoId: string, propuestaId: string): Clave {
  return `${proyectoId}:${propuestaId}`;
}

export function listarElementosCosto(proyectoId: string, propuestaId: string): ElementoCosto[] {
  return [...(almacenamiento.get(clave(proyectoId, propuestaId)) ?? [])];
}

export function obtenerElementoCosto(proyectoId: string, propuestaId: string, elementoId: string): ElementoCosto | null {
  return listarElementosCosto(proyectoId, propuestaId).find((elemento) => elemento.id === elementoId) ?? null;
}

export function crearElementoCosto(proyectoId: string, propuestaId: string, entrada: ElementoCostoEntrada): ElementoCosto {
  const nuevo: ElementoCosto = {
    ...entrada,
    id: crypto.randomUUID(),
    creadoEn: new Date().toISOString(),
    proyectoId,
    propuestaId,
  };

  const lista = listarElementosCosto(proyectoId, propuestaId);
  almacenamiento.set(clave(proyectoId, propuestaId), [...lista, nuevo]);
  return nuevo;
}

export function actualizarElementoCosto(proyectoId: string, propuestaId: string, elementoId: string, entrada: ElementoCostoEntrada): ElementoCosto | null {
  const lista = listarElementosCosto(proyectoId, propuestaId);
  const indice = lista.findIndex((elemento) => elemento.id === elementoId);
  if (indice < 0) return null;
  const actualizado: ElementoCosto = { ...lista[indice], ...entrada };
  const copia = [...lista];
  copia[indice] = actualizado;
  almacenamiento.set(clave(proyectoId, propuestaId), copia);
  return actualizado;
}

export function eliminarElementoCosto(proyectoId: string, propuestaId: string, elementoId: string): boolean {
  const lista = listarElementosCosto(proyectoId, propuestaId);
  const filtrada = lista.filter((elemento) => elemento.id !== elementoId);
  almacenamiento.set(clave(proyectoId, propuestaId), filtrada);
  return filtrada.length !== lista.length;
}
