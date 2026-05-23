import { ElementoCostoEntrada } from '@/tipos/elemento-costo';

export interface ErrorElementoCosto {
  campo: keyof ElementoCostoEntrada;
  mensaje: string;
}

export function validarElementoCosto(entrada: ElementoCostoEntrada): ErrorElementoCosto[] {
  const errores: ErrorElementoCosto[] = [];

  if (!entrada.nombre.trim()) errores.push({ campo: 'nombre', mensaje: 'El nombre es obligatorio.' });
  if (!entrada.proveedor.trim()) errores.push({ campo: 'proveedor', mensaje: 'El proveedor es obligatorio.' });
  if (!entrada.grupoMatricial.trim()) errores.push({ campo: 'grupoMatricial', mensaje: 'El grupo matricial es obligatorio.' });
  if (!entrada.subgrupoMatricial.trim()) errores.push({ campo: 'subgrupoMatricial', mensaje: 'El subgrupo matricial es obligatorio.' });
  if (!Number.isFinite(entrada.valor) || entrada.valor < 0) errores.push({ campo: 'valor', mensaje: 'El valor debe ser mayor o igual a cero.' });
  if (!Number.isInteger(entrada.tiempoAmortizacion) || entrada.tiempoAmortizacion < 0) {
    errores.push({ campo: 'tiempoAmortizacion', mensaje: 'El tiempo de amortización debe ser un número entero mayor o igual a cero.' });
  }

  return errores;
}
