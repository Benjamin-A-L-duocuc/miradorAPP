import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Cuota, Pago } from "../types"

interface PaymentsContextType {
  cuotas: Cuota[]
  pagos: Pago[]
  loading: boolean
  realizarPago: (cuotaId: number, residenteId: number, monto: number, tipoPago: string, comprobante: string) => Promise<void>
}

const PaymentsContext = createContext<PaymentsContextType>(null!)

export function PaymentsProvider({ children }: { children: ReactNode }) {
  const [cuotas, setCuotas] = useState<Cuota[]>([])
  const [pagos, setPagos] = useState<Pago[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/cuotas").then((r) => r.json()),
      fetch("/api/pagos").then((r) => r.json()),
    ]).then(([c, p]) => {
      setCuotas(c)
      setPagos(p)
      setLoading(false)
    })
  }, [])

  const realizarPago = async (cuotaId: number, residenteId: number, monto: number, tipoPago: string, comprobante: string) => {
    const res = await fetch("/api/pagos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuotaId, residenteId, monto, tipoPago, comprobante, fecha: new Date().toISOString().split("T")[0] }),
    })
    const nuevo = await res.json()
    setPagos((prev) => [...prev, nuevo])
    setCuotas((prev) => prev.map((c) => (c.id === cuotaId ? { ...c, estado: "pagado" } : c)))
  }

  return (
    <PaymentsContext.Provider value={{ cuotas, pagos, loading, realizarPago }}>
      {children}
    </PaymentsContext.Provider>
  )
}

export const usePayments = () => useContext(PaymentsContext)
