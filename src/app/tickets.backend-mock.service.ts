import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { FullTicket, Ticket, TicketStatus } from './models/ticket';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TicketsBackendMockService {
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

  getAll(ticketStatus?: TicketStatus): Observable<FullTicket[]> {
    if (!ticketStatus) {
      return forkJoin([
        this.httpClient.get<FullTicket[]>('/api/' + TicketStatus.TO_DO),
        this.httpClient.get<FullTicket[]>('/api/' + TicketStatus.TO_TEST),
        this.httpClient.get<FullTicket[]>('/api/' + TicketStatus.DONE),
      ]).pipe(
        map(([toDos, toTest, done]) => toDos.concat(toTest).concat(done))
      );
    } else {
      return this.httpClient.get<FullTicket[]>('/api/' + ticketStatus);
    }
  }

  updateTicket(ticket: FullTicket): Observable<FullTicket> {
    const params: any = ticket;
    return this.httpClient.patch<FullTicket>(
      `/api/${ticket.status}/${ticket.id}`,
      params
    );
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

  moveTicket(
    X: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    if (whereTo.listName === whereFrom.listName) {
      return this.moveWithinTheSameList(X, whereFrom, whereTo);
    } else {
      return this.moveToADifferentList(X, whereFrom, whereTo);
    }
  }

  private moveWithinTheSameList(
    X: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    // dislodge X from it's current position, meaning:
    // 1. set its left neighbor's nextId to X.id
    // 2. set its right neighbor's previousId to X.id
    const dislodgeX: Observable<any> = this.apiUpdateTicket(
      X.status,
      X.nextId,
      {
        id: X.id,
      }
    ).pipe(
      mergeMap(() => this.apiUpdateTicket(X.status, X.previousId, { id: X.id }))
    );

    // put X in a new position, meaning
    // 1. find ticket Y such that it is whereTo.elementIndex'th when counting from ticket with previousId===FIRST
    // 2. Y's right neighbor previousId set to X.id
    // 3. Y nextId set to X.id

    const findY: Observable<any> = this.getAll(X.status).pipe(
      map((allTickets) => {
        const first = allTickets.find((t) => t.previousId === 'FIRST');
        let Y: FullTicket | undefined = first;
        let i = 1;
        while (Y?.nextId !== 'LAST') {
          console.log('Y is', Y, 'i is', i);
          if (whereTo.elementIndex === i) {
            break;
          }
          i += 1;
          Y = allTickets.find((t) => t.id === Y?.nextId);
        }
        return Y;
      })
    );

    const putXInNewPosition = findY.pipe(
      mergeMap((y) => this.apiUpdateTicket(y.status, y.id, { nextId: X.id }))
    );
    return dislodgeX.pipe(mergeMap(() => putXInNewPosition));
  }

  private moveToADifferentList(
    X: FullTicket,
    whereFrom: { listName: string; elementIndex: number },
    whereTo: { listName: string; elementIndex: number }
  ): Observable<any> {
    const moveToList = of({}); //TODO
    return this.deleteTicket(X.status, X.id).pipe(mergeMap(() => moveToList));
  }
}
