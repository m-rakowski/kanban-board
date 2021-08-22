import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TicketsService } from '../../tickets.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TicketActionsUnion } from '../actions/ticket.actions';
import { of } from 'rxjs';

@Injectable()
export class TicketEffects {
  addTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Ticket] addTicketAction'),
      mergeMap((action) => {
        return this.ticketsService.addTicket(action.ticket).pipe(
          map((addedTicket) => ({
            type: '[Ticket] addTicketSuccessAction',
            ticket: addedTicket,
          }))
        );
      })
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Ticket] updateTicketAction'),
      mergeMap((action) => {
        return this.ticketsService.updateTicket(action.ticket).pipe(
          map((updatedTicket) => ({
            type: '[Ticket] updateTicketSuccessAction',
            ticket: updatedTicket,
          }))
        );
      })
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Ticket] deleteTicketAction'),
      mergeMap((action) => {
        return this.ticketsService
          .deleteTicket(action.ticket.status, action.ticket.id)
          .pipe(
            map(() => ({
              type: '[Ticket] deleteTicketSuccessAction',
              ticket: action.ticket,
            }))
          );
      })
    )
  );

  loadAllTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Ticket] loadAllTicketsAction'),
      mergeMap(() => {
        return this.ticketsService.getAll().pipe(
          map((tickets) => ({
            type: '[Ticket] loadAllTicketsSuccessAction',
            tickets: tickets,
          })),
          catchError(() => of({ type: '[Ticket] loadAllTicketsErrorAction' }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions<TicketActionsUnion>,
    private ticketsService: TicketsService
  ) {}
}
