import { useAuth } from "../context/AuthContext"
import { useResidents } from "../context/ResidentsContext"
import { usePayments } from "../context/PaymentsContext"
import { useVisitors } from "../context/VisitorsContext"
import { useStaff } from "../context/StaffContext"
import { Users, CreditCard, DoorOpen, UserCog, TrendingUp, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const { residents } = useResidents()
  const { cuotas } = usePayments()
  const { visitantes } = useVisitors()
  const { trabajadores } = useStaff()

  const morosos = cuotas.filter((c) => c.estado === "moroso").length
  const visitasActivas = visitantes.filter((v) => v.activo).length
  const ingresosMes = cuotas.filter((c) => c.estado === "pagado").length * 185000

  const cards = [
    { label: "Residentes", value: residents.length, icon: Users, color: "bg-blue-500" },
    { label: "Cuotas Pagadas", value: cuotas.filter((c) => c.estado === "pagado").length, icon: CreditCard, color: "bg-green-500" },
    { label: "Visitas Activas", value: visitasActivas, icon: DoorOpen, color: "bg-purple-500" },
    { label: "Trabajadores", value: trabajadores.length, icon: UserCog, color: "bg-amber-500" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Bienvenido, {user?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`${c.color} p-3 rounded-lg`}>
              <c.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{c.value}</p>
              <p className="text-sm text-gray-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Resumen Financiero</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Ingresos del mes</span>
              <span className="font-semibold">${ingresosMes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Morosos</span>
              <span className="font-semibold text-red-600">{morosos} residentes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total cuotas emitidas</span>
              <span className="font-semibold">{cuotas.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="font-semibold text-gray-900">Alertas de Morosidad</h2>
          </div>
          {morosos > 0 ? (
            <div className="space-y-2">
              {cuotas.filter((c) => c.estado === "moroso").slice(0, 5).map((c) => {
                const res = residents.find((r) => r.id === c.residenteId)
                return (
                  <div key={c.id} className="flex justify-between text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <span className="text-red-700">{res?.nombre} ({res?.unidad})</span>
                    <span className="text-red-600 font-medium">${c.montoTotal.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No hay morosos registrados</p>
          )}
        </div>
      </div>
    </div>
  )
}
