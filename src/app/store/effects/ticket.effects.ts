import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TicketsService } from '../../tickets.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TicketActionsUnion } from '../actions/ticket.actions';
import { of } from 'rxjs';

@Injectable()
export class TicketEffects {
  addTicket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Ticket] addTicketAction'),
        mergeMap((action) => {
          return this.ticketsService.addTicket(action.ticket);
        })
      ),
    { dispatch: false }
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
  // moveTicket$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType('[Ticket] moveItemAction'),
  //       mergeMap((action) => {
  //         return this.ticketsService.move(action.ticket);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions<TicketActionsUnion>,
    private ticketsService: TicketsService
  ) {}
}
