import { useState } from "react"
import { useMaintenance } from "../context/MaintenanceContext"
import { useResidents } from "../context/ResidentsContext"
import { Plus, Search, X } from "lucide-react"
import type { SolicitudMantenimiento, Prioridad, EstadoSolicitud } from "../types"

export default function Maintenance() {
  const { solicitudes, loading, add, update } = useMaintenance()
  const { residents } = useResidents()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<SolicitudMantenimiento>>({
    prioridad: "media",
    categoria: "Otros",
  })

  const residenteMap = new Map(residents.map((r) => [r.id, r]))

  const filtered = solicitudes.filter(
    (s) =>
      s.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      s.categoria.toLowerCase().includes(search.toLowerCase())
  )

  const estadoColors: Record<EstadoSolicitud, string> = {
    pendiente: "bg-yellow-100 text-yellow-700",
    en_proceso: "bg-blue-100 text-blue-700",
    finalizada: "bg-green-100 text-green-700",
    errada: "bg-red-100 text-red-700",
  }

  const prioridadColors: Record<Prioridad, string> = {
    baja: "bg-gray-100 text-gray-700",
    media: "bg-blue-100 text-blue-700",
    alta: "bg-orange-100 text-orange-700",
    urgente: "bg-red-100 text-red-700",
  }

  const handleSave = async () => {
    await add({
      ...form,
      residenteId: Number(form.residenteId),
      fechaSolicitud: new Date().toISOString().split("T")[0],
    })
    setShowForm(false)
    setForm({ prioridad: "media", categoria: "Otros" })
  }

  const avanzarEstado = async (s: SolicitudMantenimiento) => {
    const next: Record<EstadoSolicitud, EstadoSolicitud> = {
      pendiente: "en_proceso",
      en_proceso: "finalizada",
      finalizada: "finalizada",
      errada: "errada",
    }
    await update(s.id, { estado: next[s.estado] })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Mantención</h1>
          <p className="text-gray-500 text-sm">{solicitudes.length} solicitudes</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Nueva Solicitud
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Buscar solicitudes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 text-sm" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Nueva Solicitud</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Residente</label>
                <select value={form.residenteId || ""} onChange={(e) => setForm({ ...form, residenteId: Number(e.target.value) })} className="w-full rounded-lg border-gray-300 text-sm">
                  <option value="">Seleccionar...</option>
                  {residents.map((r) => <option key={r.id} value={r.id}>{r.nombre} - {r.unidad}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm">
                    <option value="Eléctrica">Eléctrica</option>
                    <option value="Fontanería">Fontanería</option>
                    <option value="Gas">Gas</option>
                    <option value="Estructural">Estructural</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <select value={form.prioridad} onChange={(e) => setForm({ ...form, prioridad: e.target.value as Prioridad })} className="w-full rounded-lg border-gray-300 text-sm">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.descripcion || ""} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full rounded-lg border-gray-300 text-sm" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Crear Solicitud</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const res = residenteMap.get(s.residenteId)
            return (
              <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${prioridadColors[s.prioridad]}`}>{s.prioridad}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${estadoColors[s.estado]}`}>{s.estado.replace("_", " ")}</span>
                  </div>
                  <span className="text-xs text-gray-400">{s.fechaSolicitud}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.categoria}</p>
                  <p className="text-sm text-gray-600 mt-1">{s.descripcion}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{res?.nombre} ({res?.unidad})</span>
                  {s.estado !== "finalizada" && s.estado !== "errada" && (
                    <button onClick={() => avanzarEstado(s)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100">
                      {s.estado === "pendiente" ? "Iniciar" : "Finalizar"}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">No se encontraron solicitudes</div>
          )}
        </div>
      )}
    </div>
  )
}
