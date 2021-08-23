import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullTicket, Ticket, TicketStatus } from './models/ticket';
import { TicketsBackendMockService } from './tickets.backend-mock.service';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private ticketBackendMockService: TicketsBackendMockService) {}

  addTicket(ticket: Ticket): Observable<FullTicket> {
    return this.ticketBackendMockService.addTicket(ticket);
  }

  deleteTicket(ticketStatus: TicketStatus, ticketId: string): Observable<any> {
    return this.ticketBackendMockService.deleteTicket(ticketStatus, ticketId);
  }

  updateTicket(ticket: FullTicket): Observable<FullTicket> {
    return this.ticketBackendMockService.updateTicket(ticket);
  }

  moveTicket(
    ticket: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    return this.ticketBackendMockService.moveTicket(ticket, whereFrom, whereTo);
  }

  getAll(ticketStatus?: TicketStatus): Observable<FullTicket[]> {
    return this.ticketBackendMockService.getAll(ticketStatus);
  }
}
