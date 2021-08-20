export enum TicketStatus {
  TO_DO = 'toDo',
  TO_TEST = 'toTest',
  DONE = 'done',
}

export interface Ticket {
  id?: string;
  title: string;
  content: string;
  status: TicketStatus;
}
