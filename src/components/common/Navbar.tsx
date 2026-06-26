import { useAuth } from "../../context/AuthContext"
import { LogOut, Building2, Menu } from "lucide-react"

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth()
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          <Menu className="h-5 w-5" />
        </button>
        <Building2 className="h-6 w-6 text-blue-600 hidden sm:block" />
        <span className="text-lg font-semibold text-gray-900">Edificio Mirador</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:block">{user?.nombre}</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">{user?.rol}</span>
        <button onClick={logout} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
