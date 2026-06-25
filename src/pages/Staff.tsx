import { useState } from "react"
import { useStaff } from "../context/StaffContext"
import { Search, X, UserPlus, Clock } from "lucide-react"
import type { Trabajador } from "../types"

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export default function Staff() {
  const { trabajadores, horarios, tareas, loading, addTrabajador, addHorario, updateTarea } = useStaff()
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"trabajadores" | "tareas">("trabajadores")
  const [showWorkerForm, setShowWorkerForm] = useState(false)
  const [showHorarioForm, setShowHorarioForm] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Trabajador | null>(null)
  const [workerForm, setWorkerForm] = useState<{ nombre: string; email: string; rol: "conserje" | "mantenimiento" }>({ nombre: "", email: "", rol: "mantenimiento" })
  const [horarioForm, setHorarioForm] = useState({ diaSemana: "Lunes", horaInicio: "08:00", horaFin: "17:00" })

  const getHorarios = (trabajadorId: number) => horarios.filter((h) => h.trabajadorId === trabajadorId)
  const getTrabajador = (id: number) => trabajadores.find((t) => t.id === id)

  const filtered = trabajadores.filter(
    (t) =>
      t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.rol.includes(search.toLowerCase())
  )

  const estadoColors = {
    pendiente: "bg-yellow-100 text-yellow-700",
    en_proceso: "bg-blue-100 text-blue-700",
    finalizada: "bg-green-100 text-green-700",
    errada: "bg-red-100 text-red-700",
  }

  const handleSaveWorker = async () => {
    await addTrabajador(workerForm)
    setShowWorkerForm(false)
    setWorkerForm({ nombre: "", email: "", rol: "mantenimiento" })
  }

  const handleSaveHorario = async () => {
    if (!selectedWorker) return
    await addHorario({ ...horarioForm, trabajadorId: selectedWorker.id })
    setShowHorarioForm(false)
    setHorarioForm({ diaSemana: "Lunes", horaInicio: "08:00", horaFin: "17:00" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personal</h1>
          <p className="text-gray-500 text-sm">{trabajadores.length} trabajadores</p>
        </div>
        <button onClick={() => setShowWorkerForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <UserPlus className="h-4 w-4" /> Añadir Trabajador
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab("trabajadores")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "trabajadores" ? "bg-blue-50 text-blue-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}>
          Trabajadores y Horarios
        </button>
        <button onClick={() => setTab("tareas")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "tareas" ? "bg-blue-50 text-blue-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}>
          Tareas Asignadas
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 text-sm" />
      </div>

      {showWorkerForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowWorkerForm(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Añadir Trabajador</h2>
              <button onClick={() => setShowWorkerForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={workerForm.nombre} onChange={(e) => setWorkerForm({ ...workerForm, nombre: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={workerForm.email} onChange={(e) => setWorkerForm({ ...workerForm, email: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select value={workerForm.rol} onChange={(e) => setWorkerForm({ ...workerForm, rol: e.target.value as "conserje" | "mantenimiento" })} className="w-full rounded-lg border-gray-300 text-sm">
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="conserje">Conserje</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSaveWorker} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Guardar</button>
                <button onClick={() => setShowWorkerForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHorarioForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowHorarioForm(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Agregar Horario</h2>
              <button onClick={() => setShowHorarioForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Día</label>
                <select value={horarioForm.diaSemana} onChange={(e) => setHorarioForm({ ...horarioForm, diaSemana: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm">
                  {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora inicio</label>
                  <input type="time" value={horarioForm.horaInicio} onChange={(e) => setHorarioForm({ ...horarioForm, horaInicio: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora fin</label>
                  <input type="time" value={horarioForm.horaFin} onChange={(e) => setHorarioForm({ ...horarioForm, horaFin: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSaveHorario} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Guardar</button>
                <button onClick={() => setShowHorarioForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : tab === "trabajadores" ? (
        <div className="space-y-4">
          {filtered.map((t) => {
            const hs = getHorarios(t.id)
            return (
              <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.nombre}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${t.rol === "conserje" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"}`}>{t.rol}</span>
                  </div>
                  <button onClick={() => { setSelectedWorker(t); setShowHorarioForm(true) }} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                    <Clock className="h-4 w-4" /> Agregar Horario
                  </button>
                </div>
                {hs.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500 mb-2">Horarios:</p>
                    <div className="flex flex-wrap gap-2">
                      {hs.map((h) => (
                        <span key={h.id} className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200">
                          {h.diaSemana}: {h.horaInicio} - {h.horaFin}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No se encontraron trabajadores</div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Tarea</th>
                <th className="px-4 py-3 font-medium text-gray-600">Trabajador</th>
                <th className="px-4 py-3 font-medium text-gray-600">Tipo</th>
                <th className="px-4 py-3 font-medium text-gray-600">Asignación</th>
                <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((ta) => {
                const trab = getTrabajador(ta.trabajadorId)
                return (
                  <tr key={ta.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{ta.descripcion}</td>
                    <td className="px-4 py-3 text-gray-600">{trab?.nombre}</td>
                    <td className="px-4 py-3 capitalize text-gray-600">{ta.tipoTarea}</td>
                    <td className="px-4 py-3 text-gray-600">{ta.fechaAsignacion}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${estadoColors[ta.estado]}`}>{ta.estado.replace("_", " ")}</span>
                    </td>
                    <td className="px-4 py-3">
                      {ta.estado !== "finalizada" && ta.estado !== "errada" && (
                        <button
                          onClick={() => updateTarea(ta.id, { estado: ta.estado === "pendiente" ? "en_proceso" : "finalizada" })}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100"
                        >
                          {ta.estado === "pendiente" ? "Iniciar" : "Completar"}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
              {tareas.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No hay tareas asignadas</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
