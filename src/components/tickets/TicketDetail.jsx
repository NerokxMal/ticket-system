import { useState } from 'react'
import { Send, StickyNote, User, ChevronDown } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS, AGENTES } from '../../data/mockData'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { timeAgo } from '../../utils'

const STATUS_OPTIONS = [
  { value: 'open',        label: 'Abierto'           },
  { value: 'in_progress', label: 'En progreso'       },
  { value: 'waiting',     label: 'Esperando cliente' },
  { value: 'closed',      label: 'Cerrado'           },
]

export default function TicketDetail() {
  const { getSelectedTicket, addMessage, addNote, updateStatus } = useStore()
  const ticket = getSelectedTicket()
  const [tab, setTab] = useState('chat')
  const [msgText, setMsgText] = useState('')
  const [noteText, setNoteText] = useState('')

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50">
        <p className="text-sm">Selecciona un ticket</p>
      </div>
    )
  }

  const priority = PRIORITY_LABELS[ticket.priority]
  const status   = STATUS_LABELS[ticket.status]
  const cat      = CATEGORY_LABELS[ticket.category]
  const agente    = AGENTES.find(a => a.id === ticket.agenteId)

  const sendMsg = () => {
    if (!msgText.trim()) return
    addMessage(ticket.id, msgText.trim())
    setMsgText('')
  }

  const sendNote = () => {
    if (!noteText.trim()) return
    addNote(ticket.id, noteText.trim())
    setNoteText('')
  }

  return (
    <div className="flex-1 flex overflow-hidden bg-white">
      {/* Main — chat / notas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Ticket header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-gray-400">{ticket.id}</span>
                <Badge label={cat.label} color={cat.color} />
                <Badge label={priority.label} color={priority.color} />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">{ticket.title}</h2>
            </div>

            {/* Status select */}
            <div className="relative shrink-0">
              <select
                value={ticket.status}
                onChange={e => updateStatus(ticket.id, e.target.value)}
                className="appearance-none text-xs font-medium pl-2.5 pr-7 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
              >
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {ticket.description && (
            <p className="text-xs text-gray-500 leading-relaxed">{ticket.description}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-5">
          {['chat', 'notas'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs font-medium py-2.5 mr-5 border-b-2 transition-colors capitalize
                ${tab === t ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {t === 'chat' ? `💬 Conversación` : `📝 Notas internas`}
              {t === 'notas' && ticket.notes.length > 0 && (
                <span className="ml-1.5 bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded-full">
                  {ticket.notes.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Messages / Notes */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {tab === 'chat' && (
            <>
              {ticket.messages.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-8">Sin mensajes aún</p>
              )}
              {ticket.messages.map(msg => {
                const isClient = msg.author === 'client'
                const msgAgent = AGENTES.find(a => a.id === msg.agenteId)
                return (
                  <div key={msg.id} className={`flex gap-2.5 ${isClient ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                      ${isClient ? 'bg-gray-100 text-gray-600' : (msgAgent ? `${msgAgent.color}` : 'bg-brand-100 text-brand-800')}`}>
                      {isClient ? <User size={12} /> : (msgAgent?.initials || 'AG')}
                    </div>
                    <div className={`max-w-xs lg:max-w-sm ${isClient ? '' : 'items-end'} flex flex-col`}>
                      <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed
                        ${isClient
                          ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                          : 'bg-brand-600 text-white rounded-tr-sm'}`}>
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-400 mt-0.5 px-1">{timeAgo(msg.time)}</span>
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {tab === 'notas' && (
            <>
              {ticket.notes.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-8">Sin notas internas</p>
              )}
              {ticket.notes.map(note => {
                const noteAgente = AGENTES.find(a => a.id === note.agenteId)
                return (
                  <div key={note.id} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <StickyNote size={12} className="text-amber-500" />
                      <span className="text-xs font-medium text-amber-700">{noteAgente?.name || 'Agente'}</span>
                      <span className="text-xs text-amber-400 ml-auto">{timeAgo(note.time)}</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">{note.text}</p>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          {tab === 'chat' ? (
            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Escribe un mensaje al cliente..."
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg} className="btn-primary px-3">
                <Send size={14} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                className="input flex-1 bg-amber-50 border-amber-200 focus:ring-amber-400"
                placeholder="Nota interna (no visible para el cliente)..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendNote()}
              />
              <button onClick={sendNote} className="flex items-center gap-2 bg-amber-500 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                <StickyNote size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar — info cliente */}
      <div className="w-56 shrink-0 border-l border-gray-100 bg-gray-50 overflow-y-auto">
        <div className="p-4 space-y-5">
          {/* Cliente */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Cliente</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                {ticket.client.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{ticket.client.name}</p>
                <p className="text-xs text-gray-400">{ticket.client.plan}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <InfoRow label="Email"     value={ticket.client.email}   />
              <InfoRow label="Teléfono"  value={ticket.client.phone}   />
              <InfoRow label="Dirección" value={ticket.client.address} />
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Ticket info */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Ticket</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Prioridad</span>
                <Badge label={priority.label} color={priority.color} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Categoría</span>
                <Badge label={cat.label} color={cat.color} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Estado</span>
                <Badge label={status.label} color={status.color} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Creado</span>
                <span className="text-xs text-gray-600">{timeAgo(ticket.createdAt)}</span>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* agente asignado */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">agente asignado</p>
            {agente ? (
              <div className="flex items-center gap-2">
                <Avatar agenteId={agente.id} size="md" />
                <div>
                  <p className="text-xs font-medium text-gray-800">{agente.name}</p>
                  <p className="text-xs text-gray-400">Soporte</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Sin asignar</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xs text-gray-700 break-all">{value}</p>
    </div>
  )
}
