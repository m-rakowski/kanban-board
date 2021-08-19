import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../../models/ticket';

export const addTicket = createAction(
  '[Ticket] addTicket',
  props<{ ticket: Ticket }>()
);
