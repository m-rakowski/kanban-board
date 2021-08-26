import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketsDbService } from './tickets.db.service';
import { FullTicket, Ticket, TicketStatus } from '../models/ticket';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private ticketsDbService: TicketsDbService) {}

  addTicket(ticket: Ticket): Observable<FullTicket> {
    return this.ticketsDbService.addTicket(ticket);
  }

  deleteTicket(ticketStatus: TicketStatus, ticketId: string): Observable<any> {
    return this.ticketsDbService.deleteTicket(ticketStatus, ticketId);
  }

  updateTicket(ticket: FullTicket): Observable<FullTicket> {
    return this.ticketsDbService.updateTicket(ticket);
  }

  moveTicket(
    ticket: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    return this.ticketsDbService.moveTicket(ticket, whereFrom, whereTo);
  }

  getAll(ticketStatus?: TicketStatus): Observable<FullTicket[]> {
    return this.ticketsDbService.getAll(ticketStatus);
  }
}
