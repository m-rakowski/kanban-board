import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../../models/ticket';

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
