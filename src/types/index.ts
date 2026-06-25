export type UserRole = "admin" | "conserje" | "residente" | "mantenimiento"

export interface User {
  id: number
  email: string
  nombre: string
  rol: UserRole
}

export type TipoResidente = "propietario" | "arrendatario"
export type EstadoCuota = "pendiente" | "pagado" | "moroso"
export type EstadoSolicitud = "pendiente" | "en_proceso" | "finalizada" | "errada"
export type Prioridad = "baja" | "media" | "alta" | "urgente"
export type TipoPago = "transferencia" | "efectivo" | "tarjeta"
export type TipoGasto = "gas" | "electricidad" | "agua" | "gastos_comunes"
export type EstadoTarea = "pendiente" | "en_proceso" | "finalizada" | "errada"

export interface Residente {
  id: number
  nombre: string
  rut: string
  email: string
  telefono: string
  unidad: string
  tipo: TipoResidente
  propietarioAsociado?: number
  activo: boolean
}

export interface Cuota {
  id: number
  residenteId: number
  periodo: string
  montoTotal: number
  estado: EstadoCuota
  fechaVencimiento: string
}

export interface Pago {
  id: number
  cuotaId: number
  residenteId: number
  monto: number
  fecha: string
  tipoPago: TipoPago
  comprobante: string
  validado: boolean
}

export interface SolicitudMantenimiento {
  id: number
  residenteId: number
  fechaSolicitud: string
  categoria: string
  descripcion: string
  prioridad: Prioridad
  estado: EstadoSolicitud
  tecnicoAsignado?: number
  foto?: string
}

export interface Visitante {
  id: number
  nombre: string
  rut: string
  departamentoDestino: string
  fechaHoraIngreso: string
  fechaHoraSalida?: string
  notificado: boolean
  activo: boolean
}

export interface Trabajador {
  id: number
  nombre: string
  email: string
  rol: "conserje" | "mantenimiento"
  activo: boolean
}

export interface Horario {
  id: number
  trabajadorId: number
  diaSemana: string
  horaInicio: string
  horaFin: string
}

export interface Tarea {
  id: number
  solicitudId: number
  trabajadorId: number
  descripcion: string
  fechaAsignacion: string
  estado: EstadoTarea
  tipoTarea: string
}

export interface Gasto {
  id: number
  descripcion: string
  monto: number
  tipo: TipoGasto
  fecha: string
  fechaVencimiento: string
}

export interface Alerta {
  id: number
  residenteId: number
  mensaje: string
  leida: boolean
  fecha: string
}

export interface ReporteMorosidad {
  residenteId: number
  nombre: string
  unidad: string
  deudaTotal: number
  diasMora: number
  mesesAdeudados: string[]
}
