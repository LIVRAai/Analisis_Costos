# Guía rápida de despliegue en Vercel

## 1) Verificar configuración del proyecto

Este repositorio ya incluye:

- `package.json` con scripts `build` y `start`.
- `src/app/page.tsx` como ruta raíz `/`.
- `.env.example` con variables sugeridas.
- `vercel.json` para forzar configuración de Next.js.

## 2) Variables de entorno en Vercel

En el panel de Vercel, configure (si aplica):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3) Causa más común del error `404: NOT_FOUND` de Vercel

Si aparece la pantalla genérica de Vercel (no la de Next.js), normalmente significa:

1. El dominio está apuntando a un proyecto equivocado.
2. No existe un despliegue activo en producción.
3. El dominio no está asignado al proyecto actual.
4. Está abriendo una URL de una rama/vista previa eliminada.

## 4) Validación en Vercel

1. Ir a **Project > Deployments** y confirmar que el último despliegue está en estado **Ready**.
2. Ir a **Project > Domains** y confirmar que el dominio esté asignado a este proyecto.
3. Abrir el enlace de producción generado por Vercel (botón **Visit** del despliegue más reciente).
4. Si el problema persiste, hacer **Redeploy** del último commit.

## 5) Prueba funcional mínima

Una vez arriba, abrir:

- `/`
- `/proyectos`

Si ambas rutas responden, la aplicación está publicada correctamente.
