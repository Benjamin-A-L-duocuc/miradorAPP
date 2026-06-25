import { useState } from "react"
import { useResidents } from "../context/ResidentsContext"
import { Pencil, Trash2, Search, X, UserPlus } from "lucide-react"
import type { Residente, TipoResidente } from "../types"

export default function Residents() {
  const { residents, loading, add, update, remove } = useResidents()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Residente | null>(null)
  const [form, setForm] = useState<Partial<Residente>>({ tipo: "propietario" })

  const filtered = residents.filter(
    (r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      r.rut.includes(search) ||
      r.unidad.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async () => {
    if (editing) {
      await update(editing.id, form)
    } else {
      await add(form)
    }
    setShowForm(false)
    setEditing(null)
    setForm({ tipo: "propietario" })
  }

  const handleEdit = (r: Residente) => {
    setEditing(r)
    setForm({ ...r })
    setShowForm(true)
  }

  const openNew = () => {
    setEditing(null)
    setForm({ tipo: "propietario" })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Residentes</h1>
          <p className="text-gray-500 text-sm">{filtered.length} registros</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <UserPlus className="h-4 w-4" /> Nuevo Residente
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text" placeholder="Buscar por nombre, RUT o unidad..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 text-sm"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editing ? "Editar Residente" : "Nuevo Residente"}</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={form.nombre || ""} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                  <input type="text" value={form.rut || ""} onChange={(e) => setForm({ ...form, rut: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <input type="text" value={form.unidad || ""} onChange={(e) => setForm({ ...form, unidad: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="text" value={form.telefono || ""} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full rounded-lg border-gray-300 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoResidente })} className="w-full rounded-lg border-gray-300 text-sm">
                  <option value="propietario">Propietario</option>
                  <option value="arrendatario">Arrendatario</option>
                </select>
              </div>
              {form.tipo === "arrendatario" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Propietario Asociado</label>
                  <input type="number" value={form.propietarioAsociado || ""} onChange={(e) => setForm({ ...form, propietarioAsociado: Number(e.target.value) })} className="w-full rounded-lg border-gray-300 text-sm" />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Guardar</button>
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
                  <th className="px-4 py-3 font-medium text-gray-600">Unidad</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Tipo</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="px-4 py-3 font-medium text-gray-600 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.nombre}</td>
                    <td className="px-4 py-3 text-gray-600">{r.rut}</td>
                    <td className="px-4 py-3 text-gray-600">{r.unidad}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${r.tipo === "propietario" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                        {r.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${r.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {r.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(r)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => remove(r.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-400">No se encontraron residentes</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
