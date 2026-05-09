import { Search, Plus, Bell } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function Topbar({ title }) {
  const { setNewTicketOpen, tickets } = useStore()
  const urgent = tickets.filter(t => t.priority === 'urgent' && t.status !== 'closed').length

  return (
    <header className="h-14 border-b border-gray-100 bg-white flex items-center px-5 gap-3 shrink-0">
      <h1 className="text-sm font-semibold text-gray-900 flex-1">{title}</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-56 cursor-text hover:border-gray-300 transition-colors">
        <Search size={13} />
        <span>Buscar ticket, cliente...</span>
      </div>

      {/* Bell */}
      <button className="relative p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors">
        <Bell size={16} />
        {urgent > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* New ticket */}
      <button onClick={() => setNewTicketOpen(true)} className="btn-primary">
        <Plus size={14} />
        Nuevo ticket
      </button>
    </header>
  )
}
