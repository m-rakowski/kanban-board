import { FullTicket } from '../models/ticket';

export interface GetAllTicketsResult {
  toDo: FullTicket[];
  toTest: FullTicket[];
  done: FullTicket[];
}
