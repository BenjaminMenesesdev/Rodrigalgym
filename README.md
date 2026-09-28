# RodriGal Gym - MVP

Sistema de gestion para RodriGal Gym (Puente Alto, Chile). Esta rama `mvp` contiene una demo interactiva en React, pensada para que el dueno pruebe los flujos principales antes de construir la version productiva con backend real.

## Que incluye este MVP

- Dashboard con metricas: asistencias del dia, reservas, planes por vencer/vencidos, clientes sin clases, pagos atrasados y cumpleanos proximos.
- Gestion de clientes: alta, busqueda y ficha con plan, clases restantes, antiguedad y estado de pago.
- Catalogo de planes: 8, 12, 16, 20 clases, plan libre y un plan antiguo no vendible pero activo.
- Reservas con cupos por horario (4-5 personas), bloqueo de horario lleno y cancelacion sujeta a horas minimas de anticipacion.
- Check-in de asistencia con descuento automatico de clases, bloqueo si el plan esta vencido o sin clases disponibles.
- Registro de pagos (efectivo, transferencia, tarjeta) y clientes con pago atrasado.
- Configuracion de horario del gimnasio, cupos y regla de cancelacion.

## Importante sobre esta version

Los datos se guardan en el `localStorage` del navegador, no en una base de datos real. Cada dispositivo tiene su propia copia de los datos y no hay sincronizacion entre computador y celular. No hay backend, autenticacion real, ni integracion con WhatsApp todavia. Esta version es solo para validar reglas de negocio y experiencia de uso con el dueno.

## Paleta de colores

- Naranjo principal (marca): `#E07A32`
- Naranjo oscuro (hover): `#B8622A`
- Naranjo claro (detalles): `#F0A868`
- Fondo principal: `#0D0D0D`
- Fondo de tarjetas: `#1A1A1A`
- Exito: `#22C55E`
- Advertencia: `#D9A441`
- Error: `#E5484D`

## Como correr el proyecto localmente

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173`.

## Build de produccion

```bash
npm run build
npm run preview
```

## Despliegue en Netlify

1. En Netlify, elige "Import from Git" y selecciona este repositorio.
2. Configura la rama a desplegar como `mvp` (o la que corresponda en tu sitio de pruebas).
3. Comando de build: `npm run build`.
4. Carpeta de publicacion: `dist`.
5. El archivo `netlify.toml` ya incluye esta configuracion y las reglas de redireccion para que la navegacion interna funcione correctamente.

## Proximos pasos

Una vez validado el flujo con el dueno, se debe reemplazar el almacenamiento local por un backend (Node/Express o NestJS) con PostgreSQL, autenticacion real para el personal, e integracion con WhatsApp Business API para las automatizaciones de vencimiento, atraso de pago y cumpleanos.
