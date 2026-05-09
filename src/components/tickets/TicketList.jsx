import { useStore } from '../../store/useStore'
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '../../data/mockData'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { timeAgo } from '../../utils'

const FILTERS = [
  { id: 'all',         label: 'Todos'       },
  { id: 'open',        label: 'Abiertos'    },
  { id: 'in_progress', label: 'En progreso' },
  { id: 'urgent',      label: 'Urgentes'    },
]

export default function TicketList() {
  const { selectedTicketId, selectTicket, activeFilter, setFilter, getFilteredTickets } = useStore()
  const tickets = getFilteredTickets()

  return (
    <div className="w-80 shrink-0 border-r border-gray-100 flex flex-col bg-white">
      {/* Filters */}
      <div className="px-4 py-3 border-b border-gray-100 flex gap-1.5 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors
              ${activeFilter === f.id
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-4 py-2 border-b border-gray-50">
        <p className="text-xs text-gray-400">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''}</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p className="text-sm">Sin tickets</p>
          </div>
        )}
        {tickets.map(ticket => {
          const priority = PRIORITY_LABELS[ticket.priority]
          const status   = STATUS_LABELS[ticket.status]
          const cat      = CATEGORY_LABELS[ticket.category]
          const selected = ticket.id === selectedTicketId

          return (
            <button
              key={ticket.id}
              onClick={() => selectTicket(ticket.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors
                ${selected ? 'bg-brand-50 border-l-2 border-l-brand-600' : ''}`}
            >
              {/* Row 1: id + status */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${priority.dot}`} />
                  <span className="font-mono text-xs text-gray-400">{ticket.id}</span>
                </div>
                <Badge label={status.label} color={status.color} />
              </div>

              {/* Title */}
              <p className="text-sm text-gray-800 font-medium leading-snug mb-1.5 line-clamp-2">
                {ticket.title}
              </p>

              {/* Row 3: cat + agente + time */}
              <div className="flex items-center gap-2">
                <Badge label={cat.label} color={cat.color} />
                <div className="flex-1" />
                {ticket.agenteId && <Avatar agenteId={ticket.agenteId} size="sm" />}
                <span className="text-xs text-gray-400">{timeAgo(ticket.createdAt)}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
