export enum TicketStatus {
  toDo = 'toDo',
  toTest = 'toTest',
  done = 'done',
}

export function randomTicket(ticketStatus: TicketStatus): Ticket {
  return {
    title: 'Title ' + Math.random(),
    content: 'Title ' + Math.random(),
    status: ticketStatus,
  };
}

export interface Ticket {
  title: string;
  content: string;
  status: TicketStatus;
}

export interface FullTicket extends Ticket {
  id: string;
  nextId: string | null;
}
