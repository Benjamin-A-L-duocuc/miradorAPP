import { NavLink } from "react-router-dom"
import { LayoutDashboard, Users, CreditCard, Wrench, DoorOpen, UserCog, BarChart3 } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "conserje", "mantenimiento", "residente"] },
  { to: "/residents", label: "Residentes", icon: Users, roles: ["admin"] },
  { to: "/payments", label: "Pagos", icon: CreditCard, roles: ["admin", "residente"] },
  { to: "/maintenance", label: "Mantención", icon: Wrench, roles: ["admin", "mantenimiento", "residente"] },
  { to: "/visitors", label: "Visitantes", icon: DoorOpen, roles: ["admin", "conserje"] },
  { to: "/staff", label: "Personal", icon: UserCog, roles: ["admin", "mantenimiento", "conserje"] },
  { to: "/reports", label: "Reportes", icon: BarChart3, roles: ["admin"] },
]

export function Sidebar() {
  const { user } = useAuth()
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 hidden lg:block">
      <nav className="space-y-1">
        {links
          .filter((l) => user && l.roles.includes(user.rol))
          .map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <l.icon className="h-5 w-5" />
              {l.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  )
}
