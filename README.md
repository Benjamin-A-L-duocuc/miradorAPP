# Edificio Mirador - Sistema de Gestión Residencial

Prototipo funcional para la gestión de un edificio de 160 departamentos.

## Credenciales de Acceso

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Administrador | admin@edificio.com | admin123 |

## Tecnologías

- React 19 + TypeScript 6
- Vite 8 + SWC
- Tailwind CSS 4
- MSW (Mock Service Worker)
- React Router DOM v7
- Lucide React (iconos)
- React Hook Form + Zod

## Instalación

```bash
npm install
npx msw init public/ --save
```

## Ejecución

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Módulos

1. **Dashboard** - Panel principal con estadísticas y alertas de morosidad
2. **Residentes** - CRUD de propietarios y arrendatarios
3. **Pagos** - Gestión de gastos comunes e historial de pagos
4. **Mantención** - Solicitudes de mantenimiento con seguimiento de estado
5. **Visitantes** - Control de acceso con registro de ingreso/salida
6. **Personal** - Administración de trabajadores, horarios y tareas
7. **Reportes** - Informes de morosidad y resumen financiero

## Estructura del Proyecto

```
edificio-mirador/
├── docs/
│   ├── PLAN_DE_PRUEBAS.md      # Estrategia de pruebas (ISO 9126/25000)
│   └── PLANILLA_PRUEBAS.csv     # Casos de prueba y evidencias
├── src/
│   ├── components/common/       # Layout, Sidebar, Navbar, ProtectedRoute
│   ├── context/                 # Auth, Residents, Payments, Maintenance, Visitors, Staff
│   ├── mocks/                   # MSW handlers y datos de prueba
│   ├── pages/                   # Dashboard, Login, Residents, Payments, etc.
│   └── types/                   # TypeScript interfaces
├── index.html
├── package.json
└── vite.config.ts
```

## Versiones (Git Tags)

- `v1` - Scaffold con routing, auth y layout
- `v2` - Módulo de residentes (CRUD)
- `v3` - Módulo de pagos y gastos comunes
- `v4` - Módulo de mantención/solicitudes
- `v5` - Control de visitantes
- `v6` - Gestión de personal
- `v7` - Dashboard, reportes y morosidad
- `v8` - Plan de pruebas y casos de prueba
- `v9` - Documentación final
