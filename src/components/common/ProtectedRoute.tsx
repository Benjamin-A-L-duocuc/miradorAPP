import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import type { ReactNode } from "react"

export function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: string[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.rol)) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
