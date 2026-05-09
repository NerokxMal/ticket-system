import { Wifi, LayoutDashboard, Ticket, Inbox, Users, BarChart2, Settings, ChevronLeft } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { ME } from '../../data/mockData'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const { tickets, sidebarOpen, toggleSidebar } = useStore()

  const unassigned = tickets.filter(t => !t.agenteId && t.status !== 'closed').length
  const urgent = tickets.filter(t => t.priority === 'urgent' && t.status !== 'closed').length
  const myTickets = tickets.filter(t => t.agenteId === ME.id && t.status !== 'closed').length

  return (
    <aside className={`${sidebarOpen ? 'w-52' : 'w-14'} transition-all duration-200 bg-gray-50 border-r border-gray-100 flex flex-col shrink-0`}>
      {/* Logo */}
      <div className="h-14 flex items-center px-3 border-b border-gray-100 gap-2">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shrink-0">
          <Wifi size={16} className="text-white" />
        </div>
        {sidebarOpen && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight">NetSupport</p>
            <p className="text-xs text-gray-400 leading-tight">ISP Tickets</p>
          </div>
        )}
        <button onClick={toggleSidebar} className="ml-auto p-1 rounded hover:bg-gray-200 text-gray-400">
          <ChevronLeft size={14} className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {sidebarOpen && <p className="text-xs text-gray-400 px-2 mb-1 uppercase tracking-wider">Principal</p>}

        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" open={sidebarOpen} />
        <NavItem to="/tickets" icon={Ticket} label="Mis tickets" open={sidebarOpen} badge={myTickets} />
        <NavItem to="/unassigned" icon={Inbox} label="Sin asignar" open={sidebarOpen} badge={unassigned} badgeColor="bg-red-500" />
        <NavItem to="/clients" icon={Users} label="Clientes" open={sidebarOpen} />

        {sidebarOpen && <p className="text-xs text-gray-400 px-2 mb-1 mt-4 uppercase tracking-wider">Reportes</p>}
        <div className={sidebarOpen ? '' : 'mt-4'}>
          <NavItem to="/metrics" icon={BarChart2} label="Métricas" open={sidebarOpen} />
          <NavItem to="/settings" icon={Settings} label="Configuración" open={sidebarOpen} />
        </div>
      </nav>

      {/* Footer agente */}
      <div className="border-t border-gray-100 p-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-semibold shrink-0">
          {ME.initials}
        </div>
        {sidebarOpen && (
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-800 truncate">{ME.name}</p>
            <p className="text-xs text-gray-400">Agente</p>
          </div>
        )}
      </div>
    </aside>
  )
}

function NavItem({ to, icon: Icon, label, open, badge, badgeColor = 'bg-brand-600' }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors group relative
         ${isActive ? 'bg-white text-gray-900 font-medium shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-800 hover:bg-white'}`
      }
    >
      <Icon size={16} className="shrink-0" />
      {open && <span className="flex-1 truncate">{label}</span>}
      {open && badge > 0 && (
        <span className={`${badgeColor} text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center`}>
          {badge}
        </span>
      )}
      {!open && badge > 0 && (
        <span className={`absolute -top-1 -right-1 w-4 h-4 ${badgeColor} text-white text-xs rounded-full flex items-center justify-center`}>
          {badge}
        </span>
      )}
    </NavLink>
  )
}
