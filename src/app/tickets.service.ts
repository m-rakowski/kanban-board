import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/ticket';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private httpClient: HttpClient) {}

  addTicket(ticket: Ticket): Observable<any> {
    console.log(ticket);
    return this.httpClient.post('/api/tickets', ticket);
  }

  getAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>('/api/tickets');
  }
}
