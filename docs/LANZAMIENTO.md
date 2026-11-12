# Piloto y crecimiento hasta enero de 2027

Todas las cifras son objetivos o supuestos de planificación, no tracción real ni compromisos adquiridos.

| Período propuesto | Trabajo | Decisión de salida |
|---|---|---|
| 5-15 noviembre | 20 entrevistas; comprobar tres problemas/horarios; hablar con posibles anfitriones y espacios | Al menos 8 personas eligen una fecha concreta y 3 anfitriones aceptan ensayar |
| 16-30 noviembre | 3-6 sesiones facilitadas, una zona de Medellín; medir reserva, asistencia y resultado | Al menos 60% de quienes reservan asiste; investigar cancelaciones |
| 1-15 diciembre | Repetir mejores formatos, probar invitación individual y tarjeta de resultado | Al menos 25% de asistentes reserva otra actividad en 30 días; medir por cohorte madura |
| 16-31 diciembre | Corregir fricciones; acceso general, operación, recordatorios y privacidad antes de abrir | Responsables identificados, restauración probada y flujo entre varias cuentas verificado |
| 4-31 enero 2027 | Piloto público acotado si se cumplen condiciones; 10 anfitriones y 12 sesiones mensuales como objetivo | Escalar solo los circuitos con recurrencia y experiencia positiva |

## Mecanismo de recomendación

Persona descubre una sesión útil -> participa -> obtiene un resultado que puede mostrar -> comparte voluntariamente su logro y el enlace de otra ronda -> una persona nueva reserva. La tarjeta compartible del encuentro y el enlace están implementados; la tarjeta de resultado después de asistir y la atribución de invitaciones están pendientes.

Ideas de contenido para experimentos: "Hoy aprendí a tomar esta foto con mi celular", "Llegué sin saber inglés y me fui pudiendo pedir mi café", "Una hora, seis personas y mi primera página web". Usar solo experiencias reales y consentimiento de quien aparece; estos títulos son propuestas de piezas, no testimonios.

No hay una campaña ni una automatización programada. No se han enviado mensajes, reservado espacios ni cerrado alianzas. La meta de difusión a principios de 2027 depende de datos del piloto.

## Métricas propuestas

| Métrica | Definición | Meta inicial para aprender |
|---|---|---|
| Activación | Nuevas cuentas con primera reserva real en 7 días / nuevas cuentas | >=25% |
| Tiempo al primer encuentro | Mediana desde registro hasta una reserva real | <72 horas para reservar |
| Asistencia | Asistentes confirmados / reservas activas al inicio | >=60% |
| Resultado logrado | Asistentes que confirman resultado / asistentes con respuesta | >=70%; informar tasa de respuesta |
| Repetición D30 | Asistentes que vuelven a asistir en 30 días / asistentes con ventana completa | >=25% |
| Invitación efectiva | Nuevos asistentes atribuibles a invitaciones / asistentes originales | Medir; no asumir coeficiente viral >1 |

El MVP registra reservas y creaciones. Instrumentación de cohortes, check-in, resultados e invitaciones está pendiente. Mantener eventos de ejemplo fuera de las métricas reales. Analizar por cohortes y modalidad; con pocas personas, informar recuentos y evitar porcentajes concluyentes.

## Modelo sostenible a explorar

Acceso comunitario gratuito; explorar paquetes para universidades, bibliotecas o comunidades que quieran gestionar sus circuitos, y patrocinio transparente de materiales. Son opciones comerciales sin validación ni precios fijados. La operación humana, espacios y facilitación deben presupuestarse además de la tecnología.

## Presupuesto orientativo independiente

Un despliegue futuro Next.js convencional + Vercel Pro + Supabase Pro parte de referencias de USD 20 y USD 25 mensuales, respectivamente, consultadas el 4/11/2026. Para una persona desarrolladora, un proyecto y tráfico pequeño: reservar USD 50-90/mes para base, dominio y margen operativo. Es un sobre de planificación, no un costo confirmado del MVP alojado, una cotización ni un límite de gasto. Impuestos, exceso de uso, correos/SMS, personal, materiales y espacios se calculan aparte. No se han contratado planes de pago.

Fuentes: https://vercel.com/pricing ; https://supabase.com/pricing . Reconfirmar precios y condiciones antes de contratar. Definir alertas al 50/80/100% del presupuesto y límites de consumo.

## Pendientes antes de abrir

1. Acceso general y prueba entre varias personas, coordinación privada y recordatorios con consentimiento.
2. Operador de moderación, revisión de reportes y procedimiento de incidencias.
3. Paginación y filtros de servidor, controles de tráfico y medición de rendimiento bajo carga.
4. Política de privacidad y retención, exportación de datos y respaldo/restauración verificados; el borrado actual sí existe.
5. Confirmación de anfitriones, lugares, costos de materiales y disponibilidad del nombre.
