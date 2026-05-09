import { AGENTES } from '../../data/mockData'

export default function Avatar({ agenteId, size = 'sm' }) {
  const agente = AGENTES.find(a => a.id === agenteId)
  if (!agente) return null
  const sz = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
  return (
    <div className={`${sz} ${agente.color} rounded-full flex items-center justify-center font-medium shrink-0`} title={agente.name}>
      {agente.initials}
    </div>
  )
}
