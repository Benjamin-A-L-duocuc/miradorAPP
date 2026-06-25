import { useState, useEffect } from "react"
import { useResidents } from "../context/ResidentsContext"
import { usePayments } from "../context/PaymentsContext"
import { BarChart3, Download, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import type { ReporteMorosidad } from "../types"

export default function Reports() {
  const { residents } = useResidents()
  const { cuotas, pagos } = usePayments()
  const [reportes, setReportes] = useState<ReporteMorosidad[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/reportes/morosidad")
      .then((r) => r.json())
      .then((data) => { setReportes(data); setLoading(false) })
  }, [])

  const totalDeuda = reportes.reduce((sum, r) => sum + r.deudaTotal, 0)
  const totalMorosos = reportes.length
  const ingresosMes = cuotas.filter((c) => c.estado === "pagado").length *
    (cuotas.length > 0 ? cuotas[0].montoTotal : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-500 text-sm">Informes de gestión y morosidad</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Download className="h-4 w-4" /> Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-lg"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{totalMorosos}</p><p className="text-sm text-gray-500">Residentes en mora</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-orange-100 p-3 rounded-lg"><DollarSign className="h-6 w-6 text-orange-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">${totalDeuda.toLocaleString()}</p><p className="text-sm text-gray-500">Deuda total</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-lg"><TrendingUp className="h-6 w-6 text-green-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">${ingresosMes.toLocaleString()}</p><p className="text-sm text-gray-500">Ingresos del mes</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <h2 className="font-semibold text-gray-900">Reporte de Morosidad</h2>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-400">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">Residente</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Unidad</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Deuda Total</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Días en Mora</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Meses Adeudados</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.nombre}</td>
                    <td className="px-4 py-3 text-gray-600">{r.unidad}</td>
                    <td className="px-4 py-3 font-medium text-red-600">${r.deudaTotal.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${r.diasMora > 30 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {r.diasMora} días
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.mesesAdeudados.join(", ")}</td>
                  </tr>
                ))}
                {reportes.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">No hay residentes en mora</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Resumen de Cuotas</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total cuotas emitidas</span>
              <span className="font-medium">{cuotas.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cuotas pagadas</span>
              <span className="font-medium text-green-600">{cuotas.filter((c) => c.estado === "pagado").length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cuotas pendientes</span>
              <span className="font-medium text-yellow-600">{cuotas.filter((c) => c.estado === "pendiente").length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cuotas en mora</span>
              <span className="font-medium text-red-600">{cuotas.filter((c) => c.estado === "moroso").length}</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between text-sm">
              <span className="font-medium text-gray-800">Total pagos registrados</span>
              <span className="font-medium">{pagos.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Residentes</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total residentes</span>
              <span className="font-medium">{residents.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Propietarios</span>
              <span className="font-medium">{residents.filter((r) => r.tipo === "propietario").length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Arrendatarios</span>
              <span className="font-medium">{residents.filter((r) => r.tipo === "arrendatario").length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Activos</span>
              <span className="font-medium text-green-600">{residents.filter((r) => r.activo).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
