import './globals.css';

export const metadata = {
  title: 'Plataforma de Simulación Financiera y Operacional',
  description: 'Plataforma para simulación financiera y operacional'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
