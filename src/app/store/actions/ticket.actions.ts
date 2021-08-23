import { createAction, props, union } from '@ngrx/store';
import { FullTicket, Ticket } from '../../models/ticket';

export const updateTicketAction = createAction(
  '[Ticket] updateTicketAction',
  props<{ ticket: FullTicket }>()
);
export const updateTicketSuccessAction = createAction(
  '[Ticket] updateTicketSuccessAction',
  props<{ ticket: FullTicket }>()
);
export const addTicketAction = createAction(
  '[Ticket] addTicketAction',
  props<{ ticket: Ticket }>()
);
export const addTicketSuccessAction = createAction(
  '[Ticket] addTicketSuccessAction',
  props<{ ticket: FullTicket }>()
);
export const deleteTicketAction = createAction(
  '[Ticket] deleteTicketAction',
  props<{ ticket: FullTicket }>()
);

export const moveItemAction = createAction(
  '[Ticket] moveItemAction',
  props<{
    what: FullTicket;
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
    tickets: FullTicket[];
  }>()
);

export const deleteTicketSuccessAction = createAction(
  '[Ticket] deleteTicketSuccessAction',
  props<{
    ticket: FullTicket;
  }>()
);

const all = union({
  addTicketAction,
  addTicketSuccessAction,
  moveItemAction,
  loadAllTicketsAction,
  deleteTicketAction,
  deleteTicketSuccessAction,
  updateTicketAction,
  updateTicketSuccessAction,
});
export type TicketActionsUnion = typeof all;
