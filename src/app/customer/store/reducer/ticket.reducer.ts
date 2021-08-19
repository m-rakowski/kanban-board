import { createReducer, on } from '@ngrx/store';
import { Ticket } from '../../../models/ticket';
import { addTicket } from '../action/ticket.actions';

export const initialState: TicketsState = {
  entities: {},
};

export interface TicketsState {
  entities: { [id: string]: Ticket };
}

export const ticketsReducers = createReducer<TicketsState>(
  initialState,
  on(addTicket, (state, action) => {
    return {
      ...state,
      entities: { ...state.entities, [action.ticket.id]: action.ticket },
    };
  })
);
