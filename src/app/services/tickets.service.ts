import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketsDbService } from './tickets.db.service';
import { FullTicket, Ticket, TicketStatus } from '../models/ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(
    private ticketsDbService: TicketsDbService,
    private httpClient: HttpClient
  ) {}

  addTicket(ticket: Ticket): Observable<FullTicket> {
    return this.httpClient.post<FullTicket>(`/api/tickets`, ticket, {
      headers: { 'Content-Type': 'application/json' },
    });
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
