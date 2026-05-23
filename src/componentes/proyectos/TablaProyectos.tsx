import { Proyecto } from '@/tipos/proyecto';

interface Props {
  proyectos: Proyecto[];
  alVer: (id: string) => void;
  alEditar: (id: string) => void;
  alEliminar: (id: string) => void;
}

export function TablaProyectos({ proyectos, alVer, alEditar, alEliminar }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Listado de proyectos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Cliente</th><th>Proyecto</th><th>Tipo de operación</th><th>Responsable</th><th>Moneda</th><th>Casos mensuales</th><th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id} className="border-b border-slate-100 text-slate-800">
                <td className="py-2">{proyecto.cliente}</td><td>{proyecto.nombreProyecto}</td><td>{proyecto.tipoOperacion}</td><td>{proyecto.responsable}</td><td>{proyecto.moneda}</td><td>{proyecto.cantidadCasosMensuales.toLocaleString('es-CO')}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="boton-secundario" onClick={() => alVer(proyecto.id)}>Ver</button>
                    <button className="boton-secundario" onClick={() => alEditar(proyecto.id)}>Editar</button>
                    <button className="boton-peligro" onClick={() => alEliminar(proyecto.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
