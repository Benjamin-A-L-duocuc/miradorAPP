import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Trabajador, Horario, Tarea } from "../types"

interface StaffContextType {
  trabajadores: Trabajador[]
  horarios: Horario[]
  tareas: Tarea[]
  loading: boolean
  addTrabajador: (t: Partial<Trabajador>) => Promise<void>
  addHorario: (h: Partial<Horario>) => Promise<void>
  updateTarea: (id: number, t: Partial<Tarea>) => Promise<void>
}

const StaffContext = createContext<StaffContextType>(null!)

export function StaffProvider({ children }: { children: ReactNode }) {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/trabajadores").then((r) => r.json()),
      fetch("/api/horarios").then((r) => r.json()),
      fetch("/api/tareas").then((r) => r.json()),
    ]).then(([t, h, ts]) => {
      setTrabajadores(t)
      setHorarios(h)
      setTareas(ts)
      setLoading(false)
    })
  }, [])

  const addTrabajador = async (t: Partial<Trabajador>) => {
    const res = await fetch("/api/trabajadores", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t),
    })
    const data = await res.json()
    setTrabajadores((prev) => [...prev, data])
  }

  const addHorario = async (h: Partial<Horario>) => {
    const res = await fetch("/api/horarios", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(h),
    })
    const data = await res.json()
    setHorarios((prev) => [...prev, data])
  }

  const updateTarea = async (id: number, t: Partial<Tarea>) => {
    const res = await fetch(`/api/tareas/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t),
    })
    const updated = await res.json()
    setTareas((prev) => prev.map((x) => (x.id === id ? updated : x)))
  }

  return (
    <StaffContext.Provider value={{ trabajadores, horarios, tareas, loading, addTrabajador, addHorario, updateTarea }}>
      {children}
    </StaffContext.Provider>
  )
}

export const useStaff = () => useContext(StaffContext)
