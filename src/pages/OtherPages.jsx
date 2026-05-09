import Topbar from '../components/layout/Topbar'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '../data/mockData'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import { timeAgo } from '../utils'

export function UnassignedPage() {
  const { tickets, selectTicket } = useStore()
  const navigate = useNavigate()
  const unassigned = tickets.filter(t => !t.agentId && t.status !== 'closed')

  const go = (id) => { selectTicket(id); navigate('/tickets') }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Sin asignar" />
      <div className="flex-1 overflow-y-auto p-6">
        {unassigned.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p className="text-sm font-medium">¡Todos los tickets están asignados!</p>
          </div>
        ) : (
          <div className="card overflow-hidden max-w-3xl">
            {unassigned.map(ticket => {
              const priority = PRIORITY_LABELS[ticket.priority]
              const status   = STATUS_LABELS[ticket.status]
              const cat      = CATEGORY_LABELS[ticket.category]
              return (
                <button key={ticket.id} onClick={() => go(ticket.id)}
                  className="w-full text-left flex items-center gap-3 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${priority.dot}`} />
                  <span className="font-mono text-xs text-gray-400 w-16">{ticket.id}</span>
                  <span className="flex-1 text-sm text-gray-800">{ticket.title}</span>
                  <Badge label={cat.label} color={cat.color} />
                  <Badge label={status.label} color={status.color} />
                  <span className="text-xs text-gray-400">{timeAgo(ticket.createdAt)}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function ClientsPage() {
  const { tickets } = useStore()
  const clients = [...new Map(tickets.map(t => [t.client.email, t.client])).values()]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Clientes" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="card overflow-hidden max-w-3xl">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 grid grid-cols-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Cliente</span><span>Plan</span><span>Teléfono</span><span>Tickets</span>
          </div>
          {clients.map(c => {
            const count = tickets.filter(t => t.client.email === c.email).length
            return (
              <div key={c.email} className="px-5 py-3 border-b border-gray-50 last:border-0 grid grid-cols-4 items-center hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-semibold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{c.plan}</span>
                <span className="text-xs text-gray-600">{c.phone}</span>
                <span className="text-xs font-medium text-gray-800">{count} ticket{count !== 1 ? 's' : ''}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function MetricsPage() {
  const { tickets } = useStore()
  const total = tickets.length
  const byStatus = ['open','in_progress','waiting','closed'].map(s => ({
    status: s, count: tickets.filter(t => t.status === s).length
  }))

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Métricas" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <div className="card p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Por estado</h3>
            <div className="space-y-3">
              {byStatus.map(({ status, count }) => {
                const s = STATUS_LABELS[status]
                return (
                  <div key={status} className="flex items-center gap-3">
                    <Badge label={s.label} color={s.color} />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full transition-all" style={{ width: total ? `${(count / total) * 100}%` : '0%' }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-5 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Por prioridad</h3>
            <div className="space-y-3">
              {['urgent','high','medium','low'].map(p => {
                const count = tickets.filter(t => t.priority === p).length
                const pr = PRIORITY_LABELS[p]
                return (
                  <div key={p} className="flex items-center gap-3">
                    <Badge label={pr.label} color={pr.color} />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${pr.dot} rounded-full transition-all`} style={{ width: total ? `${(count / total) * 100}%` : '0%' }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-5 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="card p-5 max-w-2xl">
          <p className="text-sm text-gray-400 text-center py-8"> Cuando haya back</p>
        </div>
      </div>
    </div>
  )
}

export function SettingsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Configuración" />
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p className="text-sm"> Configuración disponible próximamente</p>
      </div>
    </div>
  )
}
