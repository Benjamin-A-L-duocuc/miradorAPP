import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Visitante } from "../types"

interface VisitorsContextType {
  visitantes: Visitante[]
  loading: boolean
  add: (v: Partial<Visitante>) => Promise<void>
  registrarSalida: (id: number) => Promise<void>
}

const VisitorsContext = createContext<VisitorsContextType>(null!)

export function VisitorsProvider({ children }: { children: ReactNode }) {
  const [visitantes, setVisitantes] = useState<Visitante[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/visitantes")
      .then((r) => r.json())
      .then((data) => { setVisitantes(data); setLoading(false) })
  }, [])

  const add = async (v: Partial<Visitante>) => {
    const res = await fetch("/api/visitantes", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v),
    })
    const nuevo = await res.json()
    setVisitantes((prev) => [...prev, nuevo])
  }

  const registrarSalida = async (id: number) => {
    const res = await fetch(`/api/visitantes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fechaHoraSalida: new Date().toISOString(), activo: false }),
    })
    const updated = await res.json()
    setVisitantes((prev) => prev.map((x) => (x.id === id ? updated : x)))
  }

  return (
    <VisitorsContext.Provider value={{ visitantes, loading, add, registrarSalida }}>
      {children}
    </VisitorsContext.Provider>
  )
}

export const useVisitors = () => useContext(VisitorsContext)
