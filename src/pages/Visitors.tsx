import { useState } from "react"
import { useVisitors } from "../context/VisitorsContext"
import { useResidents } from "../context/ResidentsContext"
import { Plus, Search, X, LogOut } from "lucide-react"

export default function Visitors() {
  const { visitantes, loading, add, registrarSalida } = useVisitors()
  const { residents } = useResidents()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: "", rut: "", departamentoDestino: "" })

  const filtered = visitantes.filter(
    (v) =>
      v.nombre.toLowerCase().includes(search.toLowerCase()) ||
      v.departamentoDestino.toLowerCase().includes(search.toLowerCase()) ||
      v.rut.includes(search)
  )

  const handleRegister = async () => {
    await add({
      ...form,
      fechaHoraIngreso: new Date().toISOString(),
      notificado: true,
    })
    setShowForm(false)
    setForm({ nombre: "", rut: "", departamentoDestino: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Visitantes</h1>
          <p className="text-gray-500 text-sm">{visitantes.length} registros</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Registrar Ingreso
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Buscar por nombre, RUT o departamento..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 text-sm" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Registrar Ingreso</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                <input type="text" value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento destino</label>
                <select value={form.departamentoDestino} onChange={(e) => setForm({ ...form, departamentoDestino: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm">
                  <option value="">Seleccionar...</option>
                  {residents.map((r) => <option key={r.id} value={r.unidad}>{r.unidad} - {r.nombre}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleRegister} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Registrar Ingreso</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">Nombre</th>
                  <th className="px-4 py-3 font-medium text-gray-600">RUT</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Destino</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Ingreso</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Salida</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="px-4 py-3 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{v.nombre}</td>
                    <td className="px-4 py-3 text-gray-600">{v.rut}</td>
                    <td className="px-4 py-3 text-gray-600">{v.departamentoDestino}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(v.fechaHoraIngreso).toLocaleString("es-CL")}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {v.fechaHoraSalida ? new Date(v.fechaHoraSalida).toLocaleString("es-CL") : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${v.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {v.activo ? "En edificio" : "Retirado"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {v.activo && (
                        <button onClick={() => registrarSalida(v.id)} className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg font-medium hover:bg-orange-100">
                          <LogOut className="h-3 w-3" /> Registrar Salida
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-400">No se encontraron visitantes</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
