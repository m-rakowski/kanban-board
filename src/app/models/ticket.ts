import { v4 as uuidv4 } from 'uuid';

export enum TicketStatus {
  TO_DO = 'toDo',
  TO_TEST = 'toTest',
  DONE = 'done',
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

export interface TicketDTO extends Ticket {
  id: string;
  nextId: string;
  previousId: string;
}
