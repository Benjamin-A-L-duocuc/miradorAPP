import { NavLink } from "react-router-dom"
import { LayoutDashboard, Users, CreditCard, Wrench, DoorOpen, UserCog, BarChart3, X } from "lucide-react"
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

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth()

  const nav = (
    <nav className="space-y-1">
      {links
        .filter((l) => user && l.roles.includes(user.rol))
        .map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onClose}
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
  )

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-200 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-900">Edificio Mirador</span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-57px)] p-4 hidden lg:block">
        {nav}
      </aside>
    </>
  )
}
