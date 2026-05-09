import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { Ticket, Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS, AGENTES } from '../data/mockData'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import { timeAgo } from '../utils'
import Topbar from '../components/layout/Topbar'

export default function DashboardPage() {
  const { tickets, selectTicket } = useStore()
  const navigate = useNavigate()

  const open       = tickets.filter(t => t.status === 'open').length
  const inProgress = tickets.filter(t => t.status === 'in_progress').length
  const closed     = tickets.filter(t => t.status === 'closed').length
  const urgent     = tickets.filter(t => t.priority === 'urgent' && t.status !== 'closed').length
  const recent     = tickets.slice(0, 5)

  const agentStats = AGENTES.map(a => ({
    ...a,
    open: tickets.filter(t => t.agentId === a.id && t.status !== 'closed').length,
    closed: tickets.filter(t => t.agentId === a.id && t.status === 'closed').length,
  }))

  const goToTicket = (id) => {
    selectTicket(id)
    navigate('/tickets')
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={Ticket}       label="Abiertos"       value={open}       sub="tickets activos"         trend="up"   color="text-red-500 bg-red-50"    />
          <MetricCard icon={Clock}        label="En progreso"    value={inProgress} sub="siendo atendidos"         trend="neutral" color="text-amber-500 bg-amber-50" />
          <MetricCard icon={CheckCircle}  label="Cerrados hoy"   value={closed}     sub={`meta: ${closed + 2}`}   trend="up"   color="text-green-500 bg-green-50" />
          <MetricCard icon={AlertTriangle}label="Urgentes"       value={urgent}     sub="requieren atención"      trend={urgent > 2 ? 'down' : 'up'} color="text-purple-500 bg-purple-50" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Recent tickets */}
          <div className="card col-span-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Tickets recientes</h3>
              <button onClick={() => navigate('/tickets')} className="text-xs text-brand-600 hover:underline">Ver todos</button>
            </div>
            <div>
              {recent.map(ticket => {
                const status   = STATUS_LABELS[ticket.status]
                const priority = PRIORITY_LABELS[ticket.priority]
                const cat      = CATEGORY_LABELS[ticket.category]
                return (
                  <button
                    key={ticket.id}
                    onClick={() => goToTicket(ticket.id)}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0"
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${priority.dot}`} />
                    <span className="font-mono text-xs text-gray-400 w-16 shrink-0">{ticket.id}</span>
                    <span className="flex-1 text-sm text-gray-700 truncate">{ticket.title}</span>
                    <Badge label={cat.label} color={cat.color} />
                    <Badge label={status.label} color={status.color} />
                    {ticket.agentId && <Avatar agentId={ticket.agentId} size="sm" />}
                    <span className="text-xs text-gray-400 shrink-0">{timeAgo(ticket.createdAt)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Agentes */}
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Agentes</h3>
            </div>
            <div className="p-4 space-y-3">
              {agentStats.map(a => (
                <div key={a.id} className="flex items-center gap-3">
                  <Avatar agentId={a.id} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{a.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-amber-600">{a.open} activos</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs text-green-600">{a.closed} cerrados</span>
                    </div>
                  </div>
                  {/* Mini bar */}
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-400 rounded-full" style={{ width: `${Math.min((a.closed / (a.open + a.closed + 1)) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* By category */}
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 mt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Por categoría</p>
              {Object.entries(CATEGORY_LABELS).map(([key, cat]) => {
                const count = tickets.filter(t => t.category === key).length
                return (
                  <div key={key} className="flex items-center gap-2 mb-2">
                    <Badge label={cat.label} color={cat.color} />
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full" style={{ width: `${(count / tickets.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-4 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, sub, trend, color }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={16} />
        </div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
      <div className="flex items-center gap-1">
        {trend === 'up'   && <TrendingUp   size={11} className="text-green-500" />}
        {trend === 'down' && <TrendingDown  size={11} className="text-red-500"   />}
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  )
}
