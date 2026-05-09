import { create } from "zustand";
import { TICKETS, ME } from "../data/mockData";

export const useStore = create((set, get) => ({
  tickets: TICKETS,
  selectedTicketId: "TK-1042",
  activeFilter: "all",
  sidebarOpen: true,
  newTicketOpen: false,

  selectTicket: (id) => set({ selectedTicketId: id }),
  setFilter: (f) => set({ activeFilter: f }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setNewTicketOpen: (v) => set({ newTicketOpen: v }),

  getSelectedTicket: () => {
    const { tickets, selectedTicketId } = get();
    return tickets.find((t) => t.id === selectedTicketId) || null;
  },

  getFilteredTickets: () => {
    const { tickets, activeFilter } = get();
    if (activeFilter === "all") return tickets;
    if (activeFilter === "open")
      return tickets.filter((t) => t.status === "open");
    if (activeFilter === "in_progress")
      return tickets.filter((t) => t.status === "in_progress");
    if (activeFilter === "urgent")
      return tickets.filter((t) => t.priority === "urgent");
    return tickets;
  },

  addMessage: (ticketId, text) => {
    const newMsg = {
      id: `m${Date.now()}`,
      author: "agente",
      agenteId: ME.id,
      text,
      time: new Date(),
    };
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId ? { ...t, messages: [...t.messages, newMsg] } : t,
      ),
    }));
  },

  addNote: (ticketId, text) => {
    const newNote = {
      id: `n${Date.now()}`,
      agentId: ME.id,
      text,
      time: new Date(),
    };
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId ? { ...t, notes: [...t.notes, newNote] } : t,
      ),
    }));
  },

  updateStatus: (ticketId, status) => {
    set((s) => ({
      tickets: s.tickets.map((t) => (t.id === ticketId ? { ...t, status } : t)),
    }));
  },

  createTicket: (data) => {
    const newTicket = {
      id: `TK-${1000 + get().tickets.length + 43}`,
      ...data,
      agenteId: ME.id,
      createdAt: new Date(),
      messages: [],
      notes: [],
    };
    set((s) => ({
      tickets: [newTicket, ...s.tickets],
      selectedTicketId: newTicket.id,
      newTicketOpen: false,
    }));
  },
}));
