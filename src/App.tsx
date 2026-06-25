import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ResidentsProvider } from "./context/ResidentsContext"
import { PaymentsProvider } from "./context/PaymentsContext"
import { MaintenanceProvider } from "./context/MaintenanceContext"
import { VisitorsProvider } from "./context/VisitorsContext"
import { StaffProvider } from "./context/StaffContext"
import { ProtectedRoute } from "./components/common/ProtectedRoute"
import { Layout } from "./components/common/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Residents from "./pages/Residents"
import Payments from "./pages/Payments"
import Maintenance from "./pages/Maintenance"
import Visitors from "./pages/Visitors"
import Staff from "./pages/Staff"
import Reports from "./pages/Reports"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <ResidentsProvider>
                  <PaymentsProvider>
                    <MaintenanceProvider>
                      <VisitorsProvider>
                        <StaffProvider>
                          <Layout />
                        </StaffProvider>
                      </VisitorsProvider>
                    </MaintenanceProvider>
                  </PaymentsProvider>
                </ResidentsProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
