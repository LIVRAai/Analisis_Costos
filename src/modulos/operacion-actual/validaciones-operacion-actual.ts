import { OperacionActualEntrada } from '@/tipos/operacion-actual';

export interface ErrorOperacionActual {
  campo: string;
  mensaje: string;
}

function validarNumeroNoNegativo(valor: number, campo: string, etiqueta: string, errores: ErrorOperacionActual[]) {
  if (!Number.isFinite(valor) || valor < 0) {
    errores.push({ campo, mensaje: `${etiqueta} debe ser un número mayor o igual a cero.` });
  }
}

export function validarOperacionActual(entrada: OperacionActualEntrada): ErrorOperacionActual[] {
  const errores: ErrorOperacionActual[] = [];

  validarNumeroNoNegativo(entrada.costosActuales.talentoHumano, 'costosActuales.talentoHumano', 'Talento humano', errores);
  validarNumeroNoNegativo(entrada.costosActuales.tecnologia, 'costosActuales.tecnologia', 'Tecnología', errores);
  validarNumeroNoNegativo(entrada.costosActuales.operacion, 'costosActuales.operacion', 'Operación', errores);
  validarNumeroNoNegativo(entrada.costosActuales.infraestructura, 'costosActuales.infraestructura', 'Infraestructura', errores);
  validarNumeroNoNegativo(entrada.costosActuales.telefonia, 'costosActuales.telefonia', 'Telefonía', errores);
  validarNumeroNoNegativo(entrada.costosActuales.servicios, 'costosActuales.servicios', 'Servicios', errores);
  validarNumeroNoNegativo(entrada.costosActuales.consultoria, 'costosActuales.consultoria', 'Consultoría', errores);
  validarNumeroNoNegativo(entrada.costosActuales.otros, 'costosActuales.otros', 'Otros', errores);

  validarNumeroNoNegativo(entrada.indicadoresOperativos.cantidadCasos, 'indicadoresOperativos.cantidadCasos', 'Cantidad de casos', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.interaccionesMensuales, 'indicadoresOperativos.interaccionesMensuales', 'Interacciones mensuales', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.tiempoPromedioAtencion, 'indicadoresOperativos.tiempoPromedioAtencion', 'Tiempo promedio de atención', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.nivelServicio, 'indicadoresOperativos.nivelServicio', 'Nivel de servicio', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.porcentajeAbandono, 'indicadoresOperativos.porcentajeAbandono', 'Porcentaje de abandono', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.productividad, 'indicadoresOperativos.productividad', 'Productividad', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.personasRequeridas, 'indicadoresOperativos.personasRequeridas', 'Personas requeridas', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.casosPorAgente, 'indicadoresOperativos.casosPorAgente', 'Casos por agente', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.casosPendientes, 'indicadoresOperativos.casosPendientes', 'Casos pendientes', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.reprocesos, 'indicadoresOperativos.reprocesos', 'Reprocesos', errores);
  validarNumeroNoNegativo(entrada.indicadoresOperativos.nivelAutomatizacion, 'indicadoresOperativos.nivelAutomatizacion', 'Nivel de automatización', errores);

  return errores;
}
