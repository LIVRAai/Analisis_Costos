import { Propuesta } from '@/tipos/propuesta';

interface Props {
  propuestas: Propuesta[];
  alVer: (id: string) => void;
  alEditar: (id: string) => void;
  alDuplicar: (id: string) => void;
  alEliminar: (id: string) => void;
}

export function TablaPropuestas({ propuestas, alVer, alEditar, alDuplicar, alEliminar }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Listado de propuestas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Nombre</th><th>Tipo</th><th>Proveedor principal</th><th>Año inicial</th><th>Horizonte</th><th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propuestas.map((propuesta) => (
              <tr key={propuesta.id} className="border-b border-slate-100 text-slate-800">
                <td className="py-2">{propuesta.nombrePropuesta}</td><td>{propuesta.tipoPropuesta}</td><td>{propuesta.proveedorPrincipal}</td><td>{propuesta.anioInicial}</td><td>{propuesta.horizonteAnalisis} años</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => alVer(propuesta.id)} className="boton-secundario">Ver</button>
                    <button onClick={() => alEditar(propuesta.id)} className="boton-secundario">Editar</button>
                    <button onClick={() => alDuplicar(propuesta.id)} className="boton-secundario">Duplicar</button>
                    <button onClick={() => alEliminar(propuesta.id)} className="boton-peligro">Eliminar</button>
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
