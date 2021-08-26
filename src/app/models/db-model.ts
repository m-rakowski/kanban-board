import { FullTicket } from './ticket';

export interface DbModel {
  toDo: FullTicket[];
  toTest: FullTicket[];
  done: FullTicket[];
}
