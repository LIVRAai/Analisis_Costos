import { ElementoCosto } from '@/tipos/elemento-costo';

export function TablaElementosCosto({ elementos, alEditar, alEliminar }: { elementos: ElementoCosto[]; alEditar: (id: string) => void; alEliminar: (id: string) => void; }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-3 text-lg font-semibold">Elementos de costo</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead><tr className="border-b text-slate-600"><th className="py-2">Nombre</th><th>Grupo matricial</th><th>Tipo de costo</th><th>Aplicación</th><th>Año</th><th>Valor</th><th className="text-right">Acciones</th></tr></thead>
        <tbody>
          {elementos.map((e) => <tr key={e.id} className="border-b border-slate-100"><td className="py-2">{e.nombre}</td><td>{e.grupoMatricial}</td><td>{e.tipoCosto}</td><td>{e.tipoAplicacion}</td><td>Año {e.anioAplicacion}</td><td>{e.moneda} {e.valor.toLocaleString('es-CO')}</td><td className="text-right"><div className="flex justify-end gap-2"><button className="boton-secundario" onClick={() => alEditar(e.id)}>Editar</button><button className="boton-peligro" onClick={() => alEliminar(e.id)}>Eliminar</button></div></td></tr>)}
        </tbody>
      </table>
    </div>
  </section>;
}
