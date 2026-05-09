export const AGENTES = [
  {
    id: "a1",
    name: "Juan Ramírez",
    initials: "JR",
    color: "bg-brand-100 text-brand-800",
  },
  {
    id: "a2",
    name: "Ana Martínez",
    initials: "AM",
    color: "bg-teal-100 text-teal-800",
  },
  {
    id: "a3",
    name: "Sara Ríos",
    initials: "SR",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "a4",
    name: "Pedro Herrera",
    initials: "PH",
    color: "bg-purple-100 text-purple-800",
  },
];

export const ME = AGENTES[0];
//Tickets de ejemplo
export const TICKETS = [
  {
    id: "TK-1042",
    title: "Sin señal desde las 6am — zona norte",
    description:
      "El cliente reporta que desde las 6am no tiene señal de internet. Vive en el barrio El Centro, sector norte. El router muestra luz roja en el indicador WAN.",
    category: "technical",
    priority: "urgent",
    status: "open",
    client: {
      name: "Carlos Mendoza",
      email: "cmendoza@email.com",
      phone: "310-555-0192",
      plan: "Plan 100MB",
      address: "Calle 12 #34-56, Barrio El Centro",
    },
    agenteId: "a1",
    createdAt: new Date(Date.now() - 14 * 60000),
    messages: [
      {
        id: "m1",
        author: "client",
        text: "Buenos días, desde las 6am no tengo internet. El router tiene luz roja.",
        time: new Date(Date.now() - 14 * 60000),
      },
      {
        id: "m2",
        author: "agent",
        agenteId: "a1",
        text: "Buenos días Carlos, ya revisamos y hay una falla en el nodo de tu sector. Estamos trabajando en ello.",
        time: new Date(Date.now() - 10 * 60000),
      },
    ],
    notes: [
      {
        id: "n1",
        agenteId: "a1",
        text: "Falla confirmada en nodo N-12 zona norte. Técnico en camino.",
        time: new Date(Date.now() - 8 * 60000),
      },
    ],
  },
  {
    id: "TK-1041",
    title: "Velocidad muy lenta, plan 50MB bajando 8MB",
    description:
      "Cliente con plan de 50MB reporta velocidades de solo 8MB en prueba de velocidad. El problema inició hace 3 días.",
    category: "technical",
    priority: "high",
    status: "in_progress",
    client: {
      name: "Lucía Torres",
      email: "ltorres@email.com",
      phone: "315-555-0174",
      plan: "Plan 50MB",
      address: "Av. Principal #89-12",
    },
    agenteId: "a2",
    createdAt: new Date(Date.now() - 60 * 60000),
    messages: [
      {
        id: "m1",
        author: "client",
        text: "Mi internet está muy lento. Contrato 50MB y solo me llega 8MB.",
        time: new Date(Date.now() - 60 * 60000),
      },
      {
        id: "m2",
        author: "agente",
        agenteId: "a2",
        text: "Hola Lucía, vamos a revisar tu equipo remotamente. ¿Puedes reiniciar el router y decirme qué pasa?",
        time: new Date(Date.now() - 55 * 60000),
      },
      {
        id: "m3",
        author: "client",
        text: "Ya reinicié y sigue igual.",
        time: new Date(Date.now() - 50 * 60000),
      },
    ],
    notes: [],
  },
  {
    id: "TK-1040",
    title: "Cobro doble en factura de octubre",
    description:
      "El cliente fue cobrado dos veces en su factura del mes de octubre. Solicita reembolso del cobro adicional.",
    category: "billing",
    priority: "medium",
    status: "waiting",
    client: {
      name: "Pedro Gómez",
      email: "pgomez@email.com",
      phone: "320-555-0133",
      plan: "Plan 30MB",
      address: "Cra. 5 #22-80",
    },
    agenteId: "a3",
    createdAt: new Date(Date.now() - 2 * 3600000),
    messages: [
      {
        id: "m1",
        author: "client",
        text: "Me cobraron doble en octubre. Necesito que me devuelvan el dinero.",
        time: new Date(Date.now() - 2 * 3600000),
      },
      {
        id: "m2",
        author: "agent",
        agenteId: "a3",
        text: "Pedro, revisamos tu cuenta y en efecto hay un cobro duplicado. ¿Puedes enviarnos el comprobante de pago por este chat?",
        time: new Date(Date.now() - 100 * 60000),
      },
    ],
    notes: [
      {
        id: "n1",
        agenteId: "a3",
        text: "Cobro duplicado confirmado en sistema. Esperando comprobante del cliente para procesar reembolso.",
        time: new Date(Date.now() - 90 * 60000),
      },
    ],
  },
  {
    id: "TK-1039",
    title: "Solicitud nueva instalación — Urb. Las Palmas",
    description:
      "Nuevo cliente solicita instalación de servicio de internet en Urbanización Las Palmas, torre 3 apto 402.",
    category: "installation",
    priority: "high",
    status: "in_progress",
    client: {
      name: "María Rodríguez",
      email: "mrodriguez@email.com",
      phone: "301-555-0188",
      plan: "Plan 100MB",
      address: "Urb. Las Palmas T3 Apto 402",
    },
    agenteId: "a1",
    createdAt: new Date(Date.now() - 3 * 3600000),
    messages: [
      {
        id: "m1",
        author: "client",
        text: "Buenas, quiero contratar el servicio de internet para mi apartamento.",
        time: new Date(Date.now() - 3 * 3600000),
      },
      {
        id: "m2",
        author: "agente",
        agenteId: "a1",
        text: "Hola María, con gusto. ¿En qué dirección necesitas la instalación?",
        time: new Date(Date.now() - 170 * 60000),
      },
    ],
    notes: [],
  },
  {
    id: "TK-1038",
    title: "Cambio de contraseña del router",
    description:
      "El cliente no recuerda la contraseña de su router y necesita ayuda para restablecerla.",
    category: "technical",
    priority: "low",
    status: "closed",
    client: {
      name: "Andrés Silva",
      email: "asilva@email.com",
      phone: "312-555-0145",
      plan: "Plan Básico 10MB",
      address: "Calle 30 #10-20",
    },
    agenteId: "a2",
    createdAt: new Date(Date.now() - 5 * 3600000),
    messages: [
      {
        id: "m1",
        author: "client",
        text: "Olvidé la contraseña del WiFi, ¿cómo la cambio?",
        time: new Date(Date.now() - 5 * 3600000),
      },
      {
        id: "m2",
        author: "agente",
        agenteId: "a2",
        text: "Hola Andrés, entra a 192.168.1.1 en tu navegador y sigue estos pasos...",
        time: new Date(Date.now() - 290 * 60000),
      },
      {
        id: "m3",
        author: "client",
        text: "¡Listo, muchas gracias!",
        time: new Date(Date.now() - 280 * 60000),
      },
    ],
    notes: [],
  },
]; // Se llenará desde el backend

export const CATEGORY_LABELS = {
  technical: { label: "Técnico", color: "bg-blue-50 text-blue-800" },
  billing: { label: "Facturación", color: "bg-green-50 text-green-800" },
  installation: { label: "Instalación", color: "bg-amber-50 text-amber-800" },
};

export const PRIORITY_LABELS = {
  urgent: {
    label: "Urgente",
    color: "bg-red-100 text-red-800",
    dot: "bg-red-500",
  },
  high: {
    label: "Alta",
    color: "bg-orange-100 text-orange-800",
    dot: "bg-orange-400",
  },
  medium: {
    label: "Media",
    color: "bg-blue-100 text-blue-800",
    dot: "bg-blue-400",
  },
  low: {
    label: "Baja",
    color: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  },
};

export const STATUS_LABELS = {
  open: { label: "Abierto", color: "bg-red-50 text-red-700" },
  in_progress: { label: "En progreso", color: "bg-amber-50 text-amber-700" },
  waiting: { label: "Esperando cliente", color: "bg-blue-50 text-blue-700" },
  closed: { label: "Cerrado", color: "bg-green-50 text-green-700" },
};
