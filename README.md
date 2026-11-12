# Ronda

**Aprende algo. Conoce a alguien.** MVP de encuentros pequeños para compartir habilidades. Investigación y decisiones: 4 de noviembre de 2026. Objetivo de validación: enero de 2027.

## Qué recibes

Aplicación en español con búsqueda sin distinción de acentos, categorías, ciudad, modalidad, filtro temporal, agenda, guardados, perfiles e intereses, formulario de creación, inscripción con cupos, cancelación por anfitrión, exportación de calendario, enlaces compartibles y reportes. Las seis convocatorias iniciales son ejemplos identificados; las fechas de enero de 2027 son ilustrativas. No hay participantes, anfitriones, reseñas ni alianzas reales detrás de esos ejemplos.

Los ejemplos se pueden ensayar sin sesión, con datos en este navegador. Los datos de una cuenta autenticada se guardan en el servidor. Las convocatorias reales requieren sesión. El piloto alojado comienza privado y sus enlaces no otorgan acceso a otras personas.

## Stack y portabilidad

- React 19 + TypeScript; componentes y Route Handlers con estructura App Router.
- Vinext 1.0 beta como runtime del piloto sobre Cloudflare Workers. El proyecto utiliza APIs de Next.js 16, pero no ejecuta `next dev` o `next build` por defecto.
- D1 (SQLite) + esquema Drizzle y migración versionada.
- Identidad del alojamiento para el piloto; autorización de escrituras en el servidor.
- CSS propio, Lucide y fotografías de inspiración incluidas en `public/images`.

Esta es una implementación React funcional. Para ejecutarla en Next.js convencional sobre Vercel o Node hay que sustituir el adaptador D1 de `lib/server.ts`, las llamadas directas a D1 de los handlers y el adaptador de identidad `app/chatgpt-auth.ts`, configurar el proveedor elegido y cambiar los scripts de desarrollo/build. No es una migración automática: necesita pruebas de integración y migraciones SQL para PostgreSQL. La decisión del backend definitivo está abierta y documentada en `docs/ARQUITECTURA.md`.

## Desarrollo local

Requisitos: Node >=22.13, pnpm y Git. El lockfile es `pnpm-lock.yaml`.

```bash
pnpm install --frozen-lockfile
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_third_timeslip.sql
pnpm dev
```

La migración se aplica una sola vez en una base local nueva. Desarrollo local y alojamiento usan bases distintas. El perfil portable del starter simula identidad solo en desarrollo de loopback; consulta el README del starter en la documentación de infraestructura si necesitas cambiar el perfil. El perfil administrado no simula autenticación. La ruta `/signin-with-chatgpt` pertenece al alojamiento; no es una implementación OAuth propia.

## Validación

```bash
node --experimental-strip-types --test tests/*.test.mjs
node node_modules/typescript/bin/tsc --noEmit
pnpm build
```

18 pruebas de dominio y de los handlers reales, con SQLite en memoria y adaptadores de identidad/D1 simulados. Cubren validación, filtros, idempotencia, límite de cupos, cancelación, aislamiento entre cuentas y eliminación de datos. Revisión UI en escritorio y en un iframe de 390 px. No constituyen una prueba de carga, auditoría de accesibilidad ni una validación de demanda.

## Estructura

- `app/ronda-app.tsx`: experiencia React, modales accesibles con `dialog` nativo y estado.
- `app/globals.css`: sistema visual y adaptación a pantallas pequeñas.
- `app/api`: endpoints de producto.
- `lib/domain.ts`: búsqueda, validación y sentencia atómica de inscripción.
- `lib/seed.ts`: datos explícitos de ejemplo.
- `lib/server.ts`: acceso D1, control de origen y utilidades HTTP.
- `db/schema.ts`, `drizzle`: esquema e historial de migración.
- `tests`: pruebas de dominio e integración con handlers.
- `docs`: investigación, arquitectura y plan de lanzamiento.

## Límites del piloto

El descubrimiento devuelve hasta 200 registros reales; los filtros y el orden se aplican en cliente. Antes de ampliar el piloto, añadir paginación por cursor y filtros en servidor. El radar guarda intereses y los muestra; no usa un algoritmo de recomendación ni un modelo de IA. El formulario permite hasta cinco rondas por cuenta al día y grupos de 2-12 participantes. Los reportes se almacenan, pero todavía no hay un panel de moderación ni atención permanente. El calendario es una descarga manual `.ics`, no una notificación automática. Los enlaces comparten el identificador, sin realizar envíos externos. No se ofrecen pagos, chat, verificación profesional ni gestión privada de enlaces de videollamada. La eliminación borra los registros de aplicación actuales; la retención de copias de seguridad depende del proveedor.

## Despliegue y seguridad

`.openai/hosting.json` pertenece al piloto alojado; conserva su identidad al editar este sitio. El starter mantiene los comandos de compilación y la integración con Workers. El código no contiene tokens ni claves de proveedores. Todas las mutaciones verifican identidad y origen, usan SQL parametrizado y autorizan las acciones por propietario. La reserva real se inserta con una única sentencia SQL que comprueba estado, fecha y aforo. El borrado de datos usa un batch transaccional.

Antes de un lanzamiento público se necesitan: proveedor de acceso general; roles y revisión de reportes; paginación; política de datos y operación adaptada; recuperación probada; observabilidad; límites de tráfico y gasto; y coordinación privada entre participantes. Esto es un MVP privado para validar el recorrido, con tareas de producción priorizadas en `docs/LANZAMIENTO.md`.
