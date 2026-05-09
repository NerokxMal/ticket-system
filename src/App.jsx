import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import NewTicketModal from './components/tickets/NewTicketModal'
import DashboardPage from './pages/DashboardPage'
import TicketsPage from './pages/TicketsPage'
import { UnassignedPage, ClientsPage, MetricsPage, SettingsPage } from './pages/OtherPages'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Routes>
          <Route path="/"            element={<DashboardPage />} />
          <Route path="/tickets"     element={<TicketsPage />}   />
          <Route path="/unassigned"  element={<UnassignedPage />} />
          <Route path="/clients"     element={<ClientsPage />}   />
          <Route path="/metrics"     element={<MetricsPage />}   />
          <Route path="/settings"    element={<SettingsPage />}  />
        </Routes>
      </div>
      <NewTicketModal />
    </div>
  )
}
