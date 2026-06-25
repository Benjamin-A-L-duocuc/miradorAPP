import { useState } from "react"
import { usePayments } from "../context/PaymentsContext"
import { useResidents } from "../context/ResidentsContext"
import { CheckCircle, Clock, AlertTriangle, DollarSign } from "lucide-react"
import type { TipoPago } from "../types"

export default function Payments() {
  const { cuotas, pagos, realizarPago } = usePayments()
  const { residents } = useResidents()
  const [selectedCuota, setSelectedCuota] = useState<number | null>(null)
  const [tipoPago, setTipoPago] = useState<TipoPago>("transferencia")
  const [comprobante, setComprobante] = useState("")
  const [showPago, setShowPago] = useState(false)

  const getResidente = (id: number) => residents.find((r) => r.id === id)

  const handlePagar = async () => {
    if (selectedCuota === null) return
    const cuota = cuotas.find((c) => c.id === selectedCuota)
    if (!cuota) return
    await realizarPago(selectedCuota, cuota.residenteId, cuota.montoTotal, tipoPago, comprobante)
    setShowPago(false)
    setComprobante("")
    setSelectedCuota(null)
  }

  const pendientes = cuotas.filter((c) => c.estado === "pendiente")
  const morosos = cuotas.filter((c) => c.estado === "moroso")
  const pagadas = cuotas.filter((c) => c.estado === "pagado")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pagos</h1>
        <p className="text-gray-500 text-sm">Gestión de gastos comunes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-yellow-100 p-3 rounded-lg"><Clock className="h-6 w-6 text-yellow-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{pendientes.length}</p><p className="text-sm text-gray-500">Pendientes</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-lg"><CheckCircle className="h-6 w-6 text-green-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{pagadas.length}</p><p className="text-sm text-gray-500">Pagadas</p></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-lg"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{morosos.length}</p><p className="text-sm text-gray-500">Morosos</p></div>
        </div>
      </div>

      {showPago && selectedCuota && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowPago(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Registrar Pago</h2>
            {(() => {
              const cuota = cuotas.find((c) => c.id === selectedCuota)
              const res = cuota ? getResidente(cuota.residenteId) : null
              return (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p><span className="text-gray-500">Residente:</span> <strong>{res?.nombre}</strong></p>
                    <p><span className="text-gray-500">Unidad:</span> <strong>{res?.unidad}</strong></p>
                    <p><span className="text-gray-500">Período:</span> <strong>{cuota?.periodo}</strong></p>
                    <p><span className="text-gray-500">Monto:</span> <strong className="text-lg">${cuota?.montoTotal.toLocaleString()}</strong></p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de pago</label>
                    <select value={tipoPago} onChange={(e) => setTipoPago(e.target.value as TipoPago)} className="w-full rounded-lg border-gray-300 text-sm">
                      <option value="transferencia">Transferencia</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta">Tarjeta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comprobante</label>
                    <input type="text" value={comprobante} onChange={(e) => setComprobante(e.target.value)} className="w-full rounded-lg border-gray-300 text-sm" placeholder="N° de transferencia o referencia" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handlePagar} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700">Confirmar Pago</button>
                    <button onClick={() => setShowPago(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Cuotas Emitidas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Residente</th>
                <th className="px-4 py-3 font-medium text-gray-600">Unidad</th>
                <th className="px-4 py-3 font-medium text-gray-600">Período</th>
                <th className="px-4 py-3 font-medium text-gray-600">Monto</th>
                <th className="px-4 py-3 font-medium text-gray-600">Vencimiento</th>
                <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {cuotas.map((c) => {
                const res = getResidente(c.residenteId)
                return (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{res?.nombre}</td>
                    <td className="px-4 py-3 text-gray-600">{res?.unidad}</td>
                    <td className="px-4 py-3 text-gray-600">{c.periodo}</td>
                    <td className="px-4 py-3 font-medium">${c.montoTotal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">{c.fechaVencimiento}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        c.estado === "pagado" ? "bg-green-100 text-green-700" :
                        c.estado === "moroso" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {c.estado === "pagado" ? "Pagado" : c.estado === "moroso" ? "Moroso" : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {c.estado !== "pagado" && (
                        <button
                          onClick={() => { setSelectedCuota(c.id); setShowPago(true) }}
                          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700"
                        >
                          <DollarSign className="h-3 w-3" /> Pagar
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Historial de Pagos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Fecha</th>
                <th className="px-4 py-3 font-medium text-gray-600">Residente</th>
                <th className="px-4 py-3 font-medium text-gray-600">Monto</th>
                <th className="px-4 py-3 font-medium text-gray-600">Tipo</th>
                <th className="px-4 py-3 font-medium text-gray-600">Comprobante</th>
                <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((p) => {
                const res = getResidente(p.residenteId)
                return (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{p.fecha}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{res?.nombre}</td>
                    <td className="px-4 py-3 font-medium">${p.monto.toLocaleString()}</td>
                    <td className="px-4 py-3 capitalize text-gray-600">{p.tipoPago}</td>
                    <td className="px-4 py-3 text-gray-600">{p.comprobante}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.validado ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {p.validado ? "Validado" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {pagos.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No hay pagos registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
