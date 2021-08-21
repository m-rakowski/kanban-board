import { v4 as uuidv4 } from 'uuid';

export enum TicketStatus {
  TO_DO = 'toDo',
  TO_TEST = 'toTest',
  DONE = 'done',
}

export function randomTicket(): Ticket {
  return {
    id: uuidv4(),
    title: 'Title ' + Math.random(),
    content: 'Title ' + Math.random(),
    status: TicketStatus.TO_DO,
  };
}

export interface Ticket {
  id?: string;
  title: string;
  content: string;
  status: TicketStatus;
  index?: number;
}
