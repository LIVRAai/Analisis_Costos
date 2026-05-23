import { ResultadoFinancieroPropuesta } from '@/tipos/financiero';

function mostrarIndicador(valor: number | null, mensaje: string | null, sufijo = '') {
  if (valor === null) return mensaje ?? 'No disponible';
  return `${valor.toLocaleString('es-CO', { maximumFractionDigits: 2 })}${sufijo}`;
}

export function ResumenFinancieroPropuesta({ resultado }: { resultado: ResultadoFinancieroPropuesta | null }) {
  if (!resultado) {
    return <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">Seleccione una propuesta para ver su resumen financiero.</section>;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Resumen financiero por propuesta</h2>
      <p className="text-sm text-slate-600">Propuesta: {resultado.nombrePropuesta}</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 text-sm">
        <Dato etiqueta="Costo mensual actual" valor={resultado.costoMensualActual} />
        <Dato etiqueta="Costo anual actual" valor={resultado.costoAnualActual} />
        <Dato etiqueta="Costo mensual propuesta" valor={resultado.costoMensualPropuesta} />
        <Dato etiqueta="Costo anual propuesta" valor={resultado.costoAnualPropuesta} />
        <Dato etiqueta="Ahorro mensual" valor={resultado.ahorroMensual} />
        <Dato etiqueta="Ahorro anual" valor={resultado.ahorroAnual} />
        <DatoTexto etiqueta="Variación porcentual" valor={mostrarIndicador(resultado.variacionPorcentual.valor, resultado.variacionPorcentual.mensaje, ' %')} />
        <DatoTexto etiqueta="Costo por caso actual" valor={mostrarIndicador(resultado.costoPorCasoActual.valor, resultado.costoPorCasoActual.mensaje)} />
        <DatoTexto etiqueta="Costo por caso proyectado" valor={mostrarIndicador(resultado.costoPorCasoProyectado.valor, resultado.costoPorCasoProyectado.mensaje)} />
        <DatoTexto etiqueta="Retorno de inversión" valor={mostrarIndicador(resultado.retornoInversion.valor, resultado.retornoInversion.mensaje, ' %')} />
        <DatoTexto etiqueta="Tiempo de recuperación (meses)" valor={mostrarIndicador(resultado.tiempoRecuperacion.valor, resultado.tiempoRecuperacion.mensaje)} />
        <Dato etiqueta="Flujo acumulado año 1" valor={resultado.flujoAcumuladoAnio1} />
        <Dato etiqueta="Flujo acumulado año 2" valor={resultado.flujoAcumuladoAnio2} />
        <Dato etiqueta="Flujo acumulado año 3" valor={resultado.flujoAcumuladoAnio3} />
      </div>
    </section>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: number }) {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-slate-500">{etiqueta}</p><p className="font-semibold text-slate-900">{valor.toLocaleString('es-CO', { maximumFractionDigits: 2 })}</p></div>;
}

function DatoTexto({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-slate-500">{etiqueta}</p><p className="font-semibold text-slate-900">{valor}</p></div>;
}
