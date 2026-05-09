import Topbar from '../components/layout/Topbar'
import TicketList from '../components/tickets/TicketList'
import TicketDetail from '../components/tickets/TicketDetail'

export default function TicketsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Tickets" />
      <div className="flex flex-1 overflow-hidden">
        <TicketList />
        <TicketDetail />
      </div>
    </div>
  )
}
