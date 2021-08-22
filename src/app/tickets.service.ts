import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Ticket, TicketDTO, TicketStatus } from './models/ticket';
import { exhaustMap, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

//TODO rename to backend mock
@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private httpClient: HttpClient) {}

  addTicket(ticket: Ticket): Observable<any> {
    return this.getLastTicket(ticket.status).pipe(
      exhaustMap((lastTicket) => {
        if (!lastTicket) {
          return this.apiCreateNewTicketWithLastAndFirst(ticket);
        } else {
          return this.apiCreateNewTicketWithLastAndPrevious(
            ticket,
            lastTicket.id
          ).pipe(exhaustMap((y) => this.apiSetNextToY(lastTicket, y.id)));
        }
      })
    );
  }

  deleteTicket(ticketStatus: TicketStatus, ticketId: string): Observable<any> {
    return this.httpClient
      .get<TicketDTO>(`/api/${ticketStatus}/${ticketId}`)
      .pipe(
        exhaustMap((found) => {
          if (found) {
            return this.apiDeleteTicket(ticketStatus, ticketId).pipe(
              exhaustMap(() =>
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
            throw new Error('ticket ' + ticketId + ' not found');
          }
        })
      );
  }

  getLastTicket(ticketStatus: TicketStatus): Observable<TicketDTO | null> {
    return this.httpClient
      .get<TicketDTO[]>('/api/' + ticketStatus, {
        params: { nextId: 'LAST' },
      })
      .pipe(map((tickets) => (tickets.length == 1 ? tickets[0] : null)));
  }

  getFirstTicket(ticketStatus: TicketStatus): Observable<TicketDTO | null> {
    return this.httpClient
      .get<TicketDTO[]>('/api/' + ticketStatus, {
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
        .get<TicketDTO[]>('/api/' + ticketStatus)
        .pipe(map((tickets) => this.sorted(tickets)));
    }
  }

  private sorted(tickets: TicketDTO[]) {
    tickets.forEach((ticket) => {
      const last = tickets.find((ticket) => ticket.id === 'LAST');

      // last.
    });

    return [];
  }

  private apiCreateNewTicketWithLastAndFirst(
    ticket: Ticket
  ): Observable<TicketDTO> {
    return this.httpClient.post<TicketDTO>(`/api/${ticket.status}`, {
      ...ticket,
      id: uuidv4(),
      nextId: 'LAST',
      previousId: 'FIRST',
    });
  }

  private apiCreateNewTicketWithLastAndPrevious(
    ticket: Ticket,
    previousId: string
  ): Observable<TicketDTO> {
    return this.httpClient.post<TicketDTO>(`/api/${ticket.status}`, {
      ...ticket,
      id: uuidv4(),
      nextId: 'LAST',
      previousId: previousId,
    });
  }

  private apiSetNextToY(ticket: TicketDTO, nextId: string) {
    return this.httpClient.patch<TicketDTO>(
      `/api/${ticket.status}/${ticket.id}`,
      {
        nextId: nextId,
      }
    );
  }

  private apiDeleteTicket(
    ticketStatus: TicketStatus,
    ticketId: string
  ): Observable<any> {
    return this.httpClient.delete<TicketDTO>(
      `/api/${ticketStatus}/${ticketId}`
    );
  }

  private apiUpdateTicket(
    ticketStatus: TicketStatus,
    ticketId: string,
    params: any
  ): Observable<any> {
    return this.httpClient.patch(`/api/${ticketStatus}/${ticketId}`, params);
  }
}
