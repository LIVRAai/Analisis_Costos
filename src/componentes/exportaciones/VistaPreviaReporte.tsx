import { ReporteEjecutivo } from '@/tipos/exportaciones';

export function VistaPreviaReporte({ reporte }: { reporte: ReporteEjecutivo }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Vista previa del reporte</h2>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm space-y-2">
        <p><strong>Nombre del cliente:</strong> {reporte.nombreCliente}</p>
        <p><strong>Nombre del proyecto:</strong> {reporte.nombreProyecto}</p>
        <p><strong>Fecha:</strong> {reporte.fecha}</p>
        <p><strong>Resumen ejecutivo:</strong> {reporte.resumenEjecutivo}</p>
        {reporte.secciones.map((seccion) => (
          <div key={seccion.titulo} className="pt-2">
            <p className="font-semibold">{seccion.titulo}</p>
            <ul className="list-disc pl-5">
              {seccion.contenido.map((linea, i) => <li key={i}>{linea}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
