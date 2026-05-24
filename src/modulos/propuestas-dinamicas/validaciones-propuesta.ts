import { PropuestaEntrada } from '@/tipos/propuesta';

export interface ErrorPropuesta {
  campo: keyof PropuestaEntrada;
  mensaje: string;
}

export function validarPropuesta(entrada: PropuestaEntrada): ErrorPropuesta[] {
  const errores: ErrorPropuesta[] = [];

  if (!entrada.nombrePropuesta.trim()) errores.push({ campo: 'nombrePropuesta', mensaje: 'El nombre de la propuesta es obligatorio.' });
  if (!entrada.descripcion.trim()) errores.push({ campo: 'descripcion', mensaje: 'La descripción es obligatoria.' });
  if (!entrada.tipoPropuesta) errores.push({ campo: 'tipoPropuesta', mensaje: 'El tipo de propuesta es obligatorio.' });
  if (!entrada.proveedorPrincipal.trim()) errores.push({ campo: 'proveedorPrincipal', mensaje: 'El proveedor principal es obligatorio.' });

  if (!Number.isInteger(entrada.anioInicial) || entrada.anioInicial < 2000) {
    errores.push({ campo: 'anioInicial', mensaje: 'El año inicial debe ser un año válido.' });
  }

  if (!Number.isInteger(entrada.horizonteAnalisis) || entrada.horizonteAnalisis <= 0) {
    errores.push({ campo: 'horizonteAnalisis', mensaje: 'El horizonte de análisis debe ser mayor que cero.' });
  }

  return errores;
}
