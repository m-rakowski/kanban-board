import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullTicket, Ticket, TicketStatus } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../board/board.component';
import { MoveRequest } from '../models/move-request';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

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

  moveTicket(moveRequest: MoveRequest) {
    return this.httpClient.post<any>(`/api/tickets/move`, {
      ...moveRequest,
    });
  }

  getAll(ticketStatus?: TicketStatus): Observable<FullTicket[]> {
    return this.httpClient.get<FullTicket[]>(`/api/tickets`);
  }
}
