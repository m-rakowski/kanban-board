import { createAction, props, union } from '@ngrx/store';
import { FullTicket, Ticket } from '../../models/ticket';
import { DbModel } from '../../models/db-model';
import { MoveRequest } from '../../models/move-request';
import { GetAllTicketsResult } from '../../reducers/get-all-tickets-result';

export const moveAction = createAction(
  '[Ticket] moveAction',
  props<{ moveRequest: MoveRequest }>()
);
export const moveSuccessAction = createAction(
  '[Ticket] moveSuccessAction',
  props<any>()
);
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
export const genericErrorAction = createAction(
  '[Ticket] genericErrorAction',
  props<any>()
);
export const updateTicketErrorAction = createAction(
  '[Ticket] updateTicketErrorAction',
  props<{ ticket: FullTicket }>()
);
export const deleteTicketAction = createAction(
  '[Ticket] deleteTicketAction',
  props<{ ticket: FullTicket }>()
);

export const loadAllTicketsAction = createAction(
  '[Ticket] loadAllTicketsAction'
);

export const resetDbSuccessAction = createAction(
  '[Ticket] resetDbSuccessAction',
  props<{
    db: DbModel;
  }>()
);

export const loadAllTicketsSuccessAction = createAction(
  '[Ticket] loadAllTicketsSuccessAction',
  props<{
    tickets: GetAllTicketsResult;
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
  loadAllTicketsAction,
  deleteTicketAction,
  deleteTicketSuccessAction,
  updateTicketAction,
  updateTicketSuccessAction,
  updateTicketErrorAction,
  genericErrorAction,
  moveAction,
  moveSuccessAction,
});
export type TicketActionsUnion = typeof all;
