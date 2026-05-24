import Link from 'next/link';

const MODULOS = [
  {
    titulo: 'Gestión de proyectos',
    descripcion: 'Cree y administre clientes, proyectos y responsables en un flujo centralizado.',
    ruta: '/proyectos',
  },
  {
    titulo: 'Operación actual',
    descripcion: 'Registre costos actuales e indicadores operativos para construir la línea base.',
    ruta: '/proyectos',
  },
  {
    titulo: 'Propuestas dinámicas',
    descripcion: 'Diseñe alternativas operacionales y tecnológicas para análisis comparativo.',
    ruta: '/proyectos',
  },
  {
    titulo: 'Módulo financiero',
    descripcion: 'Visualice costos, ahorros, retorno de inversión y recuperación por propuesta.',
    ruta: '/proyectos',
  },
];

export default function Inicio() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <header className="rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur">
          <p className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Plataforma consultiva
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Plataforma de Simulación Financiera y Operacional
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600 md:text-lg">
            Centralice el análisis operacional y financiero en una experiencia ejecutiva, clara y trazable.
            Inicie creando o consultando proyectos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/proyectos"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-700"
            >
              Ir a proyectos
            </Link>
            <a
              href="#modulos"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Ver módulos
            </a>
          </div>
        </header>

        <section id="modulos" className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {MODULOS.map((modulo) => (
            <article key={modulo.titulo} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">{modulo.titulo}</h2>
              <p className="mt-2 text-sm text-slate-600">{modulo.descripcion}</p>
              <Link
                href={modulo.ruta}
                className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Abrir módulo →
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
