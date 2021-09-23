import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FullTicket, Ticket, TicketStatus } from '../models/ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private httpClient: HttpClient) {}

  addTicket(ticket: Ticket): Observable<FullTicket> {
    return this.httpClient.post<FullTicket>(`/api/tickets`, ticket, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteTicket(ticketStatus: TicketStatus, ticketId: string): Observable<any> {
    return this.httpClient.delete(`/api/tickets/${ticketId}`);
  }

  updateTicket(ticket: FullTicket): Observable<FullTicket> {
    return this.httpClient.put<FullTicket>(`/api/tickets/${ticket.id}`, ticket);
  }

  moveTicket(
    ticket: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    return of();
  }

  getAll(ticketStatus?: TicketStatus): Observable<FullTicket[]> {
    return this.httpClient.get<FullTicket[]>(`/api/tickets`);
  }
}
