import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Residente } from "../types"

interface ResidentsContextType {
  residents: Residente[]
  loading: boolean
  refresh: () => Promise<void>
  add: (r: Partial<Residente>) => Promise<Residente>
  update: (id: number, r: Partial<Residente>) => Promise<void>
  remove: (id: number) => Promise<void>
}

const ResidentsContext = createContext<ResidentsContextType>(null!)

export function ResidentsProvider({ children }: { children: ReactNode }) {
  const [residents, setResidents] = useState<Residente[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/residentes")
    const data = await res.json()
    setResidents(data)
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const add = async (r: Partial<Residente>) => {
    const res = await fetch("/api/residentes", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r),
    })
    const nuevo = await res.json()
    setResidents((prev) => [...prev, nuevo])
    return nuevo
  }

  const update = async (id: number, r: Partial<Residente>) => {
    const res = await fetch(`/api/residentes/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r),
    })
    const updated = await res.json()
    setResidents((prev) => prev.map((x) => (x.id === id ? updated : x)))
  }

  const remove = async (id: number) => {
    await fetch(`/api/residentes/${id}`, { method: "DELETE" })
    setResidents((prev) => prev.filter((x) => x.id !== id))
  }

  return (
    <ResidentsContext.Provider value={{ residents, loading, refresh, add, update, remove }}>
      {children}
    </ResidentsContext.Provider>
  )
}

export const useResidents = () => useContext(ResidentsContext)
