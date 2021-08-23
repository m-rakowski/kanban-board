import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { FullTicket, Ticket, TicketStatus } from './models/ticket';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

//TODO rename to backend mock
@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private httpClient: HttpClient) {}

  addTicket(ticket: Ticket): Observable<FullTicket> {
    return this.getLastTicket(ticket.status).pipe(
      mergeMap((lastTicket) => {
        if (!lastTicket) {
          return this.apiCreateNewTicketWithLastAndFirst(ticket);
        } else {
          return this.apiCreateNewTicketWithLastAndPrevious(
            ticket,
            lastTicket.id
          ).pipe(mergeMap((y) => this.apiSetNextToY(lastTicket, y.id, y)));
        }
      })
    );
  }

  deleteTicket(ticketStatus: TicketStatus, ticketId: string): Observable<any> {
    return this.httpClient
      .get<FullTicket>(`/api/${ticketStatus}/${ticketId}`)
      .pipe(
        mergeMap((found) => {
          if (found) {
            return this.apiDeleteTicket(ticketStatus, ticketId).pipe(
              mergeMap(() =>
                forkJoin([
                  this.apiUpdateTicket(ticketStatus, found.previousId, {
                    nextId: found.nextId,
                  }),
                  this.apiUpdateTicket(ticketStatus, found.nextId, {
                    previousId: found.previousId,
                  }),
                ])
              )
            );
          } else {
            return of({});
          }
        })
      );
  }

  getLastTicket(ticketStatus: TicketStatus): Observable<FullTicket | null> {
    return this.httpClient
      .get<FullTicket[]>('/api/' + ticketStatus, {
        params: { nextId: 'LAST' },
      })
      .pipe(map((tickets) => (tickets.length == 1 ? tickets[0] : null)));
  }

  getFirstTicket(ticketStatus: TicketStatus): Observable<FullTicket | null> {
    return this.httpClient
      .get<FullTicket[]>('/api/' + ticketStatus, {
        params: { previousId: 'FIRST' },
      })
      .pipe(map((tickets) => (tickets.length == 1 ? tickets[0] : null)));
  }

  getAll(ticketStatus?: TicketStatus): Observable<Ticket[]> {
    if (!ticketStatus) {
      return forkJoin([
        this.httpClient.get<Ticket[]>('/api/' + TicketStatus.TO_DO),
        this.httpClient.get<Ticket[]>('/api/' + TicketStatus.TO_TEST),
        this.httpClient.get<Ticket[]>('/api/' + TicketStatus.DONE),
      ]).pipe(
        map(([toDos, toTest, done]) => toDos.concat(toTest).concat(done))
      );
    } else {
      return this.httpClient
        .get<FullTicket[]>('/api/' + ticketStatus)
        .pipe(map((tickets) => this.sorted(tickets)));
    }
  }

  updateTicket(ticket: FullTicket): Observable<FullTicket> {
    const params: any = ticket;
    return this.httpClient.patch<FullTicket>(
      `/api/${ticket.status}/${ticket.id}`,
      params
    );
  }

  private sorted(tickets: FullTicket[]) {
    tickets.forEach((ticket) => {
      const last = tickets.find((ticket) => ticket.id === 'LAST');

      // last.
    });

    return [];
  }

  private apiCreateNewTicketWithLastAndFirst(
    ticket: Ticket
  ): Observable<FullTicket> {
    return this.httpClient.post<FullTicket>(`/api/${ticket.status}`, {
      ...ticket,
      id: uuidv4(),
      nextId: 'LAST',
      previousId: 'FIRST',
    });
  }

  private apiCreateNewTicketWithLastAndPrevious(
    ticket: Ticket,
    previousId: string
  ): Observable<FullTicket> {
    return this.httpClient.post<FullTicket>(`/api/${ticket.status}`, {
      ...ticket,
      id: uuidv4(),
      nextId: 'LAST',
      previousId: previousId,
    });
  }

  private apiSetNextToY(
    ticket: FullTicket,
    nextId: string,
    y: FullTicket
  ): Observable<FullTicket> {
    return this.httpClient
      .patch<FullTicket>(`/api/${ticket.status}/${ticket.id}`, {
        nextId: nextId,
      })
      .pipe(
        catchError(() => of()),
        map(() => y)
      );
  }

  private apiDeleteTicket(
    ticketStatus: TicketStatus,
    ticketId: string
  ): Observable<any> {
    return this.httpClient.delete<FullTicket>(
      `/api/${ticketStatus}/${ticketId}`
    );
  }

  private apiUpdateTicket(
    ticketStatus: TicketStatus,
    ticketId: string,
    params: any
  ): Observable<any> {
    if (ticketId === 'LAST' || ticketId === 'FIRST') {
      return of({});
    } else {
      return this.httpClient
        .patch(`/api/${ticketStatus}/${ticketId}`, params)
        .pipe(catchError(() => of({})));
    }
  }
}
