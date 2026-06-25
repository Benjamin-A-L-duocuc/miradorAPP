import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { SolicitudMantenimiento } from "../types"

interface MaintenanceContextType {
  solicitudes: SolicitudMantenimiento[]
  loading: boolean
  add: (s: Partial<SolicitudMantenimiento>) => Promise<void>
  update: (id: number, s: Partial<SolicitudMantenimiento>) => Promise<void>
}

const MaintenanceContext = createContext<MaintenanceContextType>(null!)

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [solicitudes, setSolicitudes] = useState<SolicitudMantenimiento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/solicitudes")
      .then((r) => r.json())
      .then((data) => { setSolicitudes(data); setLoading(false) })
  }, [])

  const add = async (s: Partial<SolicitudMantenimiento>) => {
    const res = await fetch("/api/solicitudes", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s),
    })
    const nuevo = await res.json()
    setSolicitudes((prev) => [...prev, nuevo])
  }

  const update = async (id: number, s: Partial<SolicitudMantenimiento>) => {
    const res = await fetch(`/api/solicitudes/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s),
    })
    const updated = await res.json()
    setSolicitudes((prev) => prev.map((x) => (x.id === id ? updated : x)))
  }

  return (
    <MaintenanceContext.Provider value={{ solicitudes, loading, add, update }}>
      {children}
    </MaintenanceContext.Provider>
  )
}

export const useMaintenance = () => useContext(MaintenanceContext)
