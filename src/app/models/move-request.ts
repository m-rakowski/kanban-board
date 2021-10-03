import { FullTicket, TicketStatus } from './ticket';

export interface MoveRequest {
  movedTicket: FullTicket;
  afterThisOne?: FullTicket;
  beforeThisOne?: FullTicket;
  fromListStatus: TicketStatus;
  toListStatus: TicketStatus;
}
