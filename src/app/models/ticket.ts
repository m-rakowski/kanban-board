export enum TicketStatus {
  TO_DO = 'TO_DO',
  TO_TEST = 'TO_TEST',
  DONE = 'DONE',
}

export interface Ticket {
  id?: string;
  title: string;
  content: string;
  status: TicketStatus;
}
