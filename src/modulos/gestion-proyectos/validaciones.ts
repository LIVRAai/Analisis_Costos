import { ProyectoEntrada } from '@/tipos/proyecto';

export interface ErrorFormularioProyecto {
  campo: keyof ProyectoEntrada;
  mensaje: string;
}

export function validarProyecto(entrada: ProyectoEntrada): ErrorFormularioProyecto[] {
  const errores: ErrorFormularioProyecto[] = [];

  if (!entrada.cliente.trim()) errores.push({ campo: 'cliente', mensaje: 'El cliente es obligatorio.' });
  if (!entrada.nombreProyecto.trim()) errores.push({ campo: 'nombreProyecto', mensaje: 'El nombre del proyecto es obligatorio.' });
  if (!entrada.tipoOperacion.trim()) errores.push({ campo: 'tipoOperacion', mensaje: 'El tipo de operación es obligatorio.' });
  if (!entrada.responsable.trim()) errores.push({ campo: 'responsable', mensaje: 'El responsable es obligatorio.' });
  if (!entrada.fecha) errores.push({ campo: 'fecha', mensaje: 'La fecha es obligatoria.' });
  if (!entrada.moneda) errores.push({ campo: 'moneda', mensaje: 'La moneda es obligatoria.' });

  if (!Number.isFinite(entrada.cantidadCasosMensuales) || entrada.cantidadCasosMensuales <= 0) {
    errores.push({
      campo: 'cantidadCasosMensuales',
      mensaje: 'La cantidad de casos mensuales debe ser mayor que cero.',
    });
  }

  return errores;
}
