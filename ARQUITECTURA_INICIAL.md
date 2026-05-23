# Arquitectura inicial — Plataforma de Simulación Financiera y Operacional

## 1) Arquitectura completa del sistema

Se propone una arquitectura por capas con separación estricta entre interfaz, servicios de aplicación y motor financiero.

### 1.1 Capas

- **Capa de presentación (Frontend):** Next.js + React + TypeScript + Tailwind CSS.
- **Capa de aplicación (Backend lógico en servidor):** rutas de servidor en Next.js y funciones de Supabase para orquestación.
- **Capa de dominio financiero y operativo (motor de cálculo):** biblioteca TypeScript independiente, sin dependencias visuales.
- **Capa de datos:** PostgreSQL en Supabase (esquema transaccional + tablas de resultados).
- **Capa de seguridad y auditoría:** autenticación, autorización por rol, políticas de seguridad por filas, bitácora de cambios.
- **Capa de reportes y exportación:** generación de Excel, PDF y presentación ejecutiva.

### 1.2 Principios clave

- Toda regla financiera vive en el **motor financiero**.
- El frontend solo captura datos, dispara simulaciones y muestra resultados.
- Las propuestas son entidades configurables, nunca catálogos rígidos.
- Todas las fórmulas son trazables y explicables por indicador.
- Soporte multiempresa y multiproyecto desde el diseño base.

### 1.3 Flujo de alto nivel

1. Usuario crea proyecto.
2. Registra línea base operacional y de costos actuales.
3. Crea una o más propuestas dinámicas.
4. Configura elementos de costo y variables operacionales por propuesta.
5. Ejecuta simulación por escenario.
6. Sistema calcula indicadores, guarda resultados y genera comparativos.
7. Usuario visualiza panel ejecutivo y exporta artefactos.

---

## 2) Estructura técnica de carpetas

```txt
plataforma-simulacion/
  src/
    app/
      (autenticacion)/
      (privado)/
        proyectos/
          page.tsx
          [proyectoId]/
            page.tsx
            operacion-actual/
            propuestas/
            simulaciones/
            panel-ejecutivo/
            exportaciones/
      api/
        proyectos/
        propuestas/
        simulaciones/
        exportaciones/

    componentes/
      base/
      formularios/
      tablas/
      graficas/
      paneles/
      propuestas/
      simulador/

    modulos/
      gestion-proyectos/
      operacion-actual/
      propuestas-dinamicas/
      costos/
      simulacion/
      panel-ejecutivo/
      exportaciones/
      seguridad/

    dominio/
      financiero/
        formulas/
        calculadores/
        validaciones/
        trazabilidad/
      operacional/
        proyecciones/
        productividad/

    servicios/
      supabase/
        cliente.ts
        servidor.ts
      repositorios/
      casos-de-uso/

    tipos/
    utilidades/
    estilos/

  supabase/
    migrations/
    seed/
    functions/
      simulador-financiero/
      generador-reportes/

  docs/
    arquitectura/
    modelo-datos/
    decisiones-tecnicas/

  pruebas/
    unitarias/
    integracion/
    end-to-end/
```

---

## 3) Entidades y tablas

> Convención: prefijo `cat_` para catálogos y `trx_` para transaccionales.

### 3.1 Núcleo organizacional y seguridad

- `trx_empresas`
- `trx_usuarios`
- `cat_roles`
- `trx_usuario_rol`
- `trx_auditoria_cambios`

### 3.2 Gestión de proyectos

- `trx_clientes`
- `trx_proyectos`
- `trx_proyecto_usuarios` (responsables/colaboradores)

### 3.3 Operación actual

- `trx_linea_base_operacional`
- `trx_linea_base_indicadores`
- `trx_linea_base_costos`

### 3.4 Propuestas dinámicas

- `trx_propuestas`
- `trx_propuesta_versiones` (permite versionado interno)
- `trx_elementos_costo`
- `trx_elemento_costo_detalle`

### 3.5 Simulación y escenarios

- `cat_escenarios` (conservador, esperado, optimista, personalizado)
- `trx_simulaciones`
- `trx_simulacion_variables_operacionales`
- `trx_simulacion_resultados_financieros`
- `trx_simulacion_resultados_operacionales`
- `trx_simulacion_resultados_mensuales`

### 3.6 Exportación y trazabilidad analítica

- `trx_exportaciones`
- `trx_formulas_ejecutadas` (detalle de cálculo por indicador)

---

## 4) Relaciones de base de datos

### 4.1 Relaciones principales

- Una empresa tiene muchos usuarios y muchos proyectos.
- Un cliente puede tener muchos proyectos.
- Un proyecto tiene una línea base y muchas propuestas.
- Una propuesta tiene muchos elementos de costo.
- Un proyecto tiene muchas simulaciones.
- Cada simulación corresponde a una propuesta y a un escenario.
- Cada simulación genera resultados financieros, operacionales y mensuales.

### 4.2 Cardinalidades clave

- `trx_proyectos (1) -> (N) trx_propuestas`
- `trx_propuestas (1) -> (N) trx_elementos_costo`
- `trx_proyectos (1) -> (N) trx_simulaciones`
- `trx_simulaciones (1) -> (1) trx_simulacion_resultados_financieros`
- `trx_simulaciones (1) -> (1) trx_simulacion_resultados_operacionales`
- `trx_simulaciones (1) -> (N) trx_simulacion_resultados_mensuales`

### 4.3 Integridad y gobierno

- Llaves primarias UUID.
- Llaves foráneas con borrado restringido en datos críticos.
- Campos de auditoría: fecha creación, usuario creación, fecha actualización, usuario actualización.
- Índices por `empresa_id`, `proyecto_id`, `propuesta_id`, `simulacion_id`.

---

## 5) Funcionamiento por módulo

## 5.1 Módulo de gestión de proyectos

- Alta, edición, baja lógica y consulta.
- Filtros por cliente, moneda, responsable, estado.
- Validaciones de datos mínimos requeridos.

## 5.2 Módulo de operación actual

- Carga de costos por categoría.
- Registro de indicadores operativos base.
- Cálculo de personas requeridas actuales como línea base.

## 5.3 Módulo de propuestas dinámicas

- Creación libre de propuestas sin plantillas forzadas.
- Duplicación para escenarios alternos.
- Versionado interno para preservar historial.

## 5.4 Módulo de costos

- Registro de elementos con periodicidad y naturaleza.
- Distinción entre inversión inicial y operación mensual.
- Amortización por tiempo definido.

## 5.5 Módulo de simulación financiera

- Selección de propuesta + escenario.
- Aplicación de variables operacionales proyectadas.
- Ejecución del motor financiero.
- Persistencia de resultados para trazabilidad.

## 5.6 Módulo financiero

Calcula automáticamente:

- costo mensual,
- costo anual,
- costo acumulado,
- costo por caso,
- costo por agente,
- costo por interacción,
- ahorro mensual y anual,
- retorno de inversión,
- tiempo de recuperación.

Incluye detalle de fórmula y valores de entrada por resultado.

## 5.7 Módulo de panel ejecutivo

- Tablero de indicadores principales.
- Comparativo entre propuestas.
- Visualizaciones de costo, tendencia y desempeño operacional.

## 5.8 Módulo de exportaciones

- Exportación a Excel con detalle tabular.
- Exportación a PDF ejecutivo.
- Generación de presentación ejecutiva.

## 5.9 Módulo de seguridad

- Control por rol y alcance de datos por empresa.
- Políticas de seguridad por filas en Supabase.
- Registro completo de cambios relevantes.

---

## 6) Navegación propuesta

### 6.1 Menú principal

- Inicio
- Proyectos
- Simulaciones
- Panel ejecutivo
- Exportaciones
- Administración

### 6.2 Flujo por proyecto

1. Resumen del proyecto
2. Operación actual
3. Propuestas
4. Simulaciones
5. Comparativo ejecutivo
6. Exportar

### 6.3 Patrones de experiencia

- Navegación por pestañas en detalle de proyecto.
- Acciones rápidas visibles: crear propuesta, duplicar, simular, exportar.
- Encabezado con contexto permanente (cliente, proyecto, moneda).

---

## 7) Componentes reutilizables

### 7.1 Componentes base

- Tabla corporativa reutilizable con filtros y ordenamiento.
- Tarjetas de indicador con variación porcentual.
- Selector de moneda y formato numérico.
- Campos de formulario con validación homogénea.

### 7.2 Componentes funcionales

- Editor dinámico de elementos de costo.
- Constructor de variables operacionales por escenario.
- Comparador de propuestas (vista matriz).
- Visor de trazabilidad de fórmulas (entrada, operación, resultado).

### 7.3 Componentes de visualización

- Gráfica de barras para distribución de costos.
- Gráfica de líneas para tendencia financiera.
- Gráfica acumulada para evolución de costos/ahorro.
- Mapa de participación por grupo matricial.

---

## 8) Separación frontend, backend y lógica financiera

## 8.1 Frontend

Responsabilidades:

- Captura de datos.
- Validaciones de forma y consistencia básica.
- Visualización de resultados y comparativos.

No contiene fórmulas financieras críticas.

## 8.2 Backend y servicios

Responsabilidades:

- Orquestación de casos de uso.
- Seguridad, permisos y auditoría.
- Persistencia en PostgreSQL vía Supabase.
- Disparo de simulaciones y exportaciones.

## 8.3 Motor financiero (dominio)

Responsabilidades:

- Implementación de fórmulas.
- Cálculos determinísticos.
- Trazabilidad de cada indicador.
- Pruebas unitarias robustas por fórmula.

### 8.4 Ejemplos de fórmulas implementadas

- Retorno de inversión = ((beneficio obtenido - inversión) / inversión) * 100
- Tiempo de recuperación = inversión / ahorro mensual
- Costo por caso = costo total / cantidad de casos
- Personas requeridas = (volumen * tiempo promedio de atención) / horas productivas

---

## 9) Plan de desarrollo por módulos (ejecución incremental)

### Fase 1 — Base técnica y seguridad

- Inicialización de proyecto Next.js + Supabase.
- Modelo de usuarios, roles y empresas.
- Estructura de diseño visual corporativo.

### Fase 2 — Gestión de proyectos y línea base

- Módulo de proyectos completo.
- Captura de operación actual.
- Persistencia y validaciones.

### Fase 3 — Propuestas dinámicas y costos

- Creación/edición/duplicación/eliminación de propuestas.
- Registro de elementos de costo y amortización.

### Fase 4 — Motor financiero y simulación

- Implementación del motor de cálculo desacoplado.
- Escenarios conservador, esperado, optimista y personalizado.
- Guardado de resultados y trazabilidad.

### Fase 5 — Panel ejecutivo y comparativos

- Indicadores consolidados.
- Gráficas y comparadores multi propuesta.

### Fase 6 — Exportaciones y cierre operativo

- Excel, PDF y presentación ejecutiva.
- Auditoría final, pruebas integrales y endurecimiento de seguridad.

---

## 10) Riesgos y controles recomendados

- **Riesgo:** inconsistencias de datos de entrada.
  - **Control:** reglas de validación y alertas de completitud.
- **Riesgo:** pérdida de trazabilidad de fórmula.
  - **Control:** tabla de fórmulas ejecutadas por simulación.
- **Riesgo:** crecimiento de tiempos de cálculo.
  - **Control:** preagregación mensual y optimización de índices.
- **Riesgo:** dependencia de personas expertas.
  - **Control:** documentación funcional y técnica en español.

---

## 11) Entregable de esta etapa

Esta etapa deja definido:

- arquitectura objetivo,
- estructura técnica,
- modelo de datos,
- relaciones,
- diseño modular,
- navegación,
- separación de responsabilidades,
- y hoja de ruta de construcción incremental.

Con esto, la siguiente iteración puede iniciar implementando **Fase 1** y **Fase 2**.
