import type { Residente, Cuota, Pago, SolicitudMantenimiento, Visitante, Trabajador, Horario, Tarea, Gasto, Alerta } from "../types"

export const residentes: Residente[] = [
  { id: 1, nombre: "María González", rut: "12.345.678-9", email: "maria@email.com", telefono: "+56 9 1234 5678", unidad: "A-101", tipo: "propietario", activo: true },
  { id: 2, nombre: "Carlos Muñoz", rut: "23.456.789-0", email: "carlos@email.com", telefono: "+56 9 2345 6789", unidad: "A-102", tipo: "propietario", activo: true },
  { id: 3, nombre: "Ana Soto", rut: "34.567.890-1", email: "ana@email.com", telefono: "+56 9 3456 7890", unidad: "B-201", tipo: "propietario", activo: true },
  { id: 4, nombre: "Pedro Ramírez", rut: "45.678.901-2", email: "pedro@email.com", telefono: "+56 9 4567 8901", unidad: "B-202", tipo: "arrendatario", propietarioAsociado: 3, activo: true },
  { id: 5, nombre: "Laura Torres", rut: "56.789.012-3", email: "laura@email.com", telefono: "+56 9 5678 9012", unidad: "C-301", tipo: "propietario", activo: true },
  { id: 6, nombre: "Jorge Díaz", rut: "67.890.123-4", email: "jorge@email.com", telefono: "+56 9 6789 0123", unidad: "C-302", tipo: "arrendatario", propietarioAsociado: 5, activo: true },
  { id: 7, nombre: "Sofía Vega", rut: "78.901.234-5", email: "sofia@email.com", telefono: "+56 9 7890 1234", unidad: "D-401", tipo: "propietario", activo: true },
  { id: 8, nombre: "Miguel Rojas", rut: "89.012.345-6", email: "miguel@email.com", telefono: "+56 9 8901 2345", unidad: "D-402", tipo: "arrendatario", propietarioAsociado: 7, activo: true },
  { id: 9, nombre: "Carmen Flores", rut: "90.123.456-7", email: "carmen@email.com", telefono: "+56 9 9012 3456", unidad: "E-501", tipo: "propietario", activo: true },
  { id: 10, nombre: "Pablo Castro", rut: "01.234.567-8", email: "pablo@email.com", telefono: "+56 9 0123 4567", unidad: "E-502", tipo: "propietario", activo: true },
]

export const cuotas: Cuota[] = [
  { id: 1, residenteId: 1, periodo: "Junio 2026", montoTotal: 185000, estado: "pagado", fechaVencimiento: "2026-06-15" },
  { id: 2, residenteId: 2, periodo: "Junio 2026", montoTotal: 185000, estado: "pagado", fechaVencimiento: "2026-06-15" },
  { id: 3, residenteId: 3, periodo: "Junio 2026", montoTotal: 185000, estado: "pendiente", fechaVencimiento: "2026-06-15" },
  { id: 4, residenteId: 4, periodo: "Junio 2026", montoTotal: 185000, estado: "moroso", fechaVencimiento: "2026-06-15" },
  { id: 5, residenteId: 5, periodo: "Junio 2026", montoTotal: 185000, estado: "pagado", fechaVencimiento: "2026-06-15" },
  { id: 6, residenteId: 6, periodo: "Junio 2026", montoTotal: 185000, estado: "moroso", fechaVencimiento: "2026-06-15" },
  { id: 7, residenteId: 7, periodo: "Mayo 2026", montoTotal: 180000, estado: "pagado", fechaVencimiento: "2026-05-15" },
  { id: 8, residenteId: 8, periodo: "Junio 2026", montoTotal: 185000, estado: "pendiente", fechaVencimiento: "2026-06-15" },
  { id: 9, residenteId: 9, periodo: "Junio 2026", montoTotal: 185000, estado: "pagado", fechaVencimiento: "2026-06-15" },
  { id: 10, residenteId: 10, periodo: "Junio 2026", montoTotal: 185000, estado: "moroso", fechaVencimiento: "2026-06-15" },
  { id: 11, residenteId: 4, periodo: "Mayo 2026", montoTotal: 180000, estado: "moroso", fechaVencimiento: "2026-05-15" },
  { id: 12, residenteId: 6, periodo: "Mayo 2026", montoTotal: 180000, estado: "moroso", fechaVencimiento: "2026-05-15" },
  { id: 13, residenteId: 10, periodo: "Mayo 2026", montoTotal: 180000, estado: "moroso", fechaVencimiento: "2026-05-15" },
]

export const pagos: Pago[] = [
  { id: 1, cuotaId: 1, residenteId: 1, monto: 185000, fecha: "2026-06-10", tipoPago: "transferencia", comprobante: "TRF-001", validado: true },
  { id: 2, cuotaId: 2, residenteId: 2, monto: 185000, fecha: "2026-06-11", tipoPago: "tarjeta", comprobante: "TAR-001", validado: true },
  { id: 3, cuotaId: 5, residenteId: 5, monto: 185000, fecha: "2026-06-09", tipoPago: "transferencia", comprobante: "TRF-002", validado: true },
  { id: 4, cuotaId: 7, residenteId: 7, monto: 180000, fecha: "2026-05-12", tipoPago: "efectivo", comprobante: "EFE-001", validado: true },
  { id: 5, cuotaId: 9, residenteId: 9, monto: 185000, fecha: "2026-06-08", tipoPago: "transferencia", comprobante: "TRF-003", validado: true },
]

export const solicitudes: SolicitudMantenimiento[] = [
  { id: 1, residenteId: 1, fechaSolicitud: "2026-06-01", categoria: "Eléctrica", descripcion: "Enchufe de la sala no funciona", prioridad: "media", estado: "finalizada", tecnicoAsignado: 1 },
  { id: 2, residenteId: 3, fechaSolicitud: "2026-06-05", categoria: "Fontanería", descripcion: "Fuga de agua en cocina", prioridad: "alta", estado: "en_proceso", tecnicoAsignado: 2 },
  { id: 3, residenteId: 4, fechaSolicitud: "2026-06-08", categoria: "Gas", descripcion: "Olor a gas en el departamento", prioridad: "urgente", estado: "en_proceso", tecnicoAsignado: 1 },
  { id: 4, residenteId: 6, fechaSolicitud: "2026-06-10", categoria: "Estructural", descripcion: "Ventana del dormitorio no cierra", prioridad: "baja", estado: "pendiente" },
  { id: 5, residenteId: 8, fechaSolicitud: "2026-06-12", categoria: "Otros", descripcion: "Control de portón eléctrico no funciona", prioridad: "media", estado: "pendiente" },
]

export const visitantes: Visitante[] = [
  { id: 1, nombre: "Roberto Vargas", rut: "11.222.333-4", departamentoDestino: "A-101", fechaHoraIngreso: "2026-06-20T10:30:00", fechaHoraSalida: "2026-06-20T12:15:00", notificado: true, activo: false },
  { id: 2, nombre: "Daniela Paz", rut: "22.333.444-5", departamentoDestino: "C-301", fechaHoraIngreso: "2026-06-21T14:00:00", fechaHoraSalida: "2026-06-21T16:30:00", notificado: true, activo: false },
  { id: 3, nombre: "Felipe Soto", rut: "33.444.555-6", departamentoDestino: "B-201", fechaHoraIngreso: "2026-06-22T09:00:00", notificado: true, activo: true },
  { id: 4, nombre: "Camila Rivas", rut: "44.555.666-7", departamentoDestino: "E-501", fechaHoraIngreso: "2026-06-22T11:00:00", notificado: false, activo: true },
  { id: 5, nombre: "Tomás Herrera", rut: "55.666.777-8", departamentoDestino: "D-401", fechaHoraIngreso: "2026-06-22T15:30:00", notificado: true, activo: true },
]

export const trabajadores: Trabajador[] = [
  { id: 1, nombre: "Luis Martínez", email: "luis@mirador.cl", rol: "mantenimiento", activo: true },
  { id: 2, nombre: "Pedro Ávila", email: "pedro@mirador.cl", rol: "mantenimiento", activo: true },
  { id: 3, nombre: "Claudia Ríos", email: "claudia@mirador.cl", rol: "conserje", activo: true },
  { id: 4, nombre: "Javier Luna", email: "javier@mirador.cl", rol: "conserje", activo: true },
  { id: 5, nombre: "Andrea Muñoz", email: "andrea@mirador.cl", rol: "conserje", activo: true },
]

export const horarios: Horario[] = [
  { id: 1, trabajadorId: 1, diaSemana: "Lunes", horaInicio: "08:00", horaFin: "17:00" },
  { id: 2, trabajadorId: 1, diaSemana: "Martes", horaInicio: "08:00", horaFin: "17:00" },
  { id: 3, trabajadorId: 1, diaSemana: "Miércoles", horaInicio: "08:00", horaFin: "17:00" },
  { id: 4, trabajadorId: 2, diaSemana: "Jueves", horaInicio: "09:00", horaFin: "18:00" },
  { id: 5, trabajadorId: 2, diaSemana: "Viernes", horaInicio: "09:00", horaFin: "18:00" },
  { id: 6, trabajadorId: 3, diaSemana: "Lunes", horaInicio: "07:00", horaFin: "15:00" },
  { id: 7, trabajadorId: 3, diaSemana: "Martes", horaInicio: "07:00", horaFin: "15:00" },
  { id: 8, trabajadorId: 3, diaSemana: "Miércoles", horaInicio: "07:00", horaFin: "15:00" },
  { id: 9, trabajadorId: 4, diaSemana: "Jueves", horaInicio: "15:00", horaFin: "23:00" },
  { id: 10, trabajadorId: 4, diaSemana: "Viernes", horaInicio: "15:00", horaFin: "23:00" },
  { id: 11, trabajadorId: 5, diaSemana: "Sábado", horaInicio: "08:00", horaFin: "20:00" },
  { id: 12, trabajadorId: 5, diaSemana: "Domingo", horaInicio: "08:00", horaFin: "20:00" },
]

export const tareas: Tarea[] = [
  { id: 1, solicitudId: 1, trabajadorId: 1, descripcion: "Reparar enchufe sala A-101", fechaAsignacion: "2026-06-02", estado: "finalizada", tipoTarea: "reparación" },
  { id: 2, solicitudId: 2, trabajadorId: 2, descripcion: "Reparar fuga cocina B-201", fechaAsignacion: "2026-06-05", estado: "en_proceso", tipoTarea: "reparación" },
  { id: 3, solicitudId: 3, trabajadorId: 1, descripcion: "Revisar fuga gas B-202", fechaAsignacion: "2026-06-08", estado: "en_proceso", tipoTarea: "urgencia" },
]

export const gastos: Gasto[] = [
  { id: 1, descripcion: "Electricidad junio", monto: 3200000, tipo: "electricidad", fecha: "2026-06-01", fechaVencimiento: "2026-06-30" },
  { id: 2, descripcion: "Agua junio", monto: 1800000, tipo: "agua", fecha: "2026-06-01", fechaVencimiento: "2026-06-30" },
  { id: 3, descripcion: "Gas junio", monto: 950000, tipo: "gas", fecha: "2026-06-01", fechaVencimiento: "2026-06-30" },
  { id: 4, descripcion: "Mantenimiento ascensores", monto: 1200000, tipo: "gastos_comunes", fecha: "2026-06-05", fechaVencimiento: "2026-06-30" },
  { id: 5, descripcion: "Remuneraciones personal", monto: 4500000, tipo: "gastos_comunes", fecha: "2026-06-01", fechaVencimiento: "2026-06-30" },
]

export const alertas: Alerta[] = [
  { id: 1, residenteId: 4, mensaje: "Tiene 2 cuotas impagas (Mayo y Junio). Su deuda total es $365.000.", leida: false, fecha: "2026-06-22" },
  { id: 2, residenteId: 6, mensaje: "Tiene 2 cuotas impagas (Mayo y Junio). Su deuda total es $365.000.", leida: false, fecha: "2026-06-22" },
  { id: 3, residenteId: 10, mensaje: "Tiene 2 cuotas impagas (Mayo y Junio). Su deuda total es $365.000.", leida: true, fecha: "2026-06-20" },
]
