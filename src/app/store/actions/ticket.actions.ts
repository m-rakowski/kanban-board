import { createAction, props, union } from '@ngrx/store';
import { Ticket } from '../../models/ticket';

export const addTicketAction = createAction(
  '[Ticket] addTicketAction',
  props<{ ticket: Ticket }>()
);

export const moveItemAction = createAction(
  '[Ticket] moveItemAction',
  props<{
    what: Ticket;
    whereTo: { listName: string; elementIndex: number };
    whereFrom: { listName: string; elementIndex: number };
  }>()
);
export const loadAllTicketsAction = createAction(
  '[Ticket] loadAllTicketsAction'
);

export const loadAllTicketsSuccessAction = createAction(
  '[Ticket] loadAllTicketsSuccessAction',
  props<{
    tickets: Ticket[];
  }>()
);

const all = union({ addTicketAction, moveItemAction, loadAllTicketsAction });
export type TicketActionsUnion = typeof all;
