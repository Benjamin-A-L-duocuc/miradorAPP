# Plan de Pruebas - Edificio Mirador

## 1. Objetivo
Evaluar la calidad del prototipo funcional "Edificio Mirador" basándose en las normas **ISO 9126** e **ISO 25000**, verificando que el sistema cumple con los requisitos funcionales y de usabilidad establecidos en el DAS.

## 2. Alcance
Se probarán los 7 módulos principales del sistema: Login/Autenticación, Dashboard, Residentes, Pagos/Gastos Comunes, Mantención/Solicitudes, Visitantes, Personal y Reportes de Morosidad.

## 3. Características de Calidad Evaluadas (ISO 9126)

| Característica | Sub-característica | Qué se evalúa en el prototipo |
|---|---|---|
| **Funcionalidad** | Adecuación | Cada caso de uso opera correctamente: CRUD residentes, pago de cuotas, creación de solicitudes, registro de visitas, asignación de horarios, generación de reportes |
| **Funcionalidad** | Precisión | Los montos, cálculos y estados se muestran correctamente |
| **Funcionalidad** | Seguridad | El login valida credenciales; las rutas están protegidas por rol |
| **Usabilidad** | Comprensibilidad | La interfaz es clara, con etiquetas en español y mensajes de error informativos |
| **Usabilidad** | Operabilidad | La navegación es intuitiva, los formularios tienen validación y feedback |
| **Usabilidad** | Atractividad | Diseño responsive con Tailwind CSS, colores y tipografía consistentes |
| **Fiabilidad** | Tolerancia a fallos | El sistema maneja errores de API (MSW), inputs inválidos y estados vacíos |
| **Eficiencia** | Comportamiento temporal | Los tiempos de carga son aceptables para un prototipo con MSW |
| **Mantenibilidad** | Capacidad de análisis | Código estructurado en capas (contextos, componentes, páginas, tipos) |
| **Mantenibilidad** | Modificabilidad | Componentes reutilizables, TypeScript tipado, separación de concerns |
| **Portabilidad** | Adaptabilidad | Funciona en Chrome, Firefox y Edge; diseño responsive para desktop y mobile |

## 4. Criterios de Aceptación
- **Funcionalidad**: 100% de los casos de prueba críticos deben pasar
- **Usabilidad**: El usuario debe completar las tareas sin asistencia externa
- **Fiabilidad**: El sistema no debe mostrar errores no controlados

## 5. Herramientas
- **Frontend**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS 4
- **Mock API**: MSW (Mock Service Worker)
- **Navegador**: Google Chrome (principal), Firefox (secundario)

## 6. Riesgos y Mitigación
| Riesgo | Mitigación |
|---|---|
| Datos mock no reflejan la realidad | Los datos se basan en el DAS y cubren todos los escenarios |
| MSW no captura todas las peticiones | Se configuró `onUnhandledRequest: "bypass"` para peticiones no mockeadas |
| Errores de TypeScript en tiempo de compilación | Se usa `tsc -b` en el build para detectar errores temprano |

---

*Documento basado en ISO 9126 e ISO 25000*
*Versión 1.0 - Junio 2026*
