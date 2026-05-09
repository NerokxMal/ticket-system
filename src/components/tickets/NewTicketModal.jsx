import { useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function NewTicketModal() {
  const { newTicketOpen, setNewTicketOpen, createTicket } = useStore()
  const [form, setForm] = useState({
    title: '', description: '', category: 'technical',
    priority: 'medium', status: 'open',
    client: { name: '', email: '', phone: '', plan: 'Plan 50MB', address: '' },
  })

  if (!newTicketOpen) return null

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))
  const setClient = (field, val) => setForm(f => ({ ...f, client: { ...f.client, [field]: val } }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.client.name) return
    createTicket(form)
    setForm({ title: '', description: '', category: 'technical', priority: 'medium', status: 'open', client: { name: '', email: '', phone: '', plan: 'Plan 50MB', address: '' } })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Nuevo ticket</h2>
          <button onClick={() => setNewTicketOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Título */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de problema *</label>
            <input className="input" placeholder="Ej: Sin señal en zona norte" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
            <textarea className="textarea" rows={3} placeholder="Describe el problema con detalle..." value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          {/* Categoría + Prioridad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="technical">Técnico</option>
                <option value="billing">Facturación</option>
                <option value="installation">Instalación</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Prioridad</label>
              <select className="select" value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="urgent">Urgente</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-100" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Datos del cliente</p>

          {/* Cliente */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input className="input" placeholder="Nombre completo" value={form.client.name} onChange={e => setClient('name', e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
              <input className="input" placeholder="310-555-0000" value={form.client.phone} onChange={e => setClient('phone', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input className="input" type="email" placeholder="correo@ejemplo.com" value={form.client.email} onChange={e => setClient('email', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Plan contratado</label>
              <select className="select" value={form.client.plan} onChange={e => setClient('plan', e.target.value)}>
                <option>Plan Básico 10MB</option>
                <option>Plan 30MB</option>
                <option>Plan 50MB</option>
                <option>Plan 100MB</option>
                <option>Plan 200MB</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Dirección</label>
              <input className="input" placeholder="Dirección del cliente" value={form.client.address} onChange={e => setClient('address', e.target.value)} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setNewTicketOpen(false)} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Crear ticket</button>
          </div>
        </form>
      </div>
    </div>
  )
}
