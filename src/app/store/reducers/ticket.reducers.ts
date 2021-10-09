import { createReducer, on } from '@ngrx/store';
import {
  addTicketAction,
  addTicketSuccessAction,
  deleteTicketAction,
  deleteTicketSuccessAction,
  genericErrorAction,
  loadAllTicketsSuccessAction,
  moveSuccessAction,
  resetDbSuccessAction,
  updateTicketAction,
  updateTicketErrorAction,
  updateTicketSuccessAction,
} from '../actions/ticket.actions';
import { db } from '../../sample.db';
import { FullTicket } from '../../models/ticket';

export const initialState: TicketsState = {
  toDo: [],
  toTest: [],
  done: [],
  updateInProgress: false,
};

export interface TicketsState {
  toDo: FullTicket[];
  toTest: FullTicket[];
  done: FullTicket[];
  updateInProgress: boolean;
}

export const ticketsReducers = createReducer<TicketsState>(
  initialState,
  on(addTicketAction, (state, action) => {
    return {
      ...state,
      updateInProgress: true,
    };
  }),
  on(updateTicketAction, (state, action) => {
    return {
      ...state,
      updateInProgress: true,
    };
  }),
  on(addTicketSuccessAction, (state, action) => {
    return {
      ...state,
      [action.ticket.status]: [...state[action.ticket.status], action.ticket],
      updateInProgress: false,
    };
  }),
  on(updateTicketSuccessAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex(
      (ticket) => ticket.id === action.ticket.id
    );

    if (foundIndex > -1) {
      copy[foundIndex] = action.ticket;
      return {
        ...state,
        updateInProgress: false,
        [action.ticket.status]: copy,
      };
    } else {
      return { ...state, updateInProgress: false };
    }
  }),
  on(loadAllTicketsSuccessAction, (state, action) => {
    const newState = {
      ...state,
      ...action.tickets,
    };
    return newState;
  }),
  on(deleteTicketAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex((el) => el.id === action.ticket.id);
    copy.splice(foundIndex, 1);
    return { ...state, updateInProgress: true, [action.ticket.status]: copy };
  }),
  on(deleteTicketSuccessAction, (state, action) => {
    return { ...state, updateInProgress: false };
  }),
  on(resetDbSuccessAction, (state, action) => {
    return { ...state, toDo: db.toDo, toTest: db.toTest, done: db.done };
  }),
  on(moveSuccessAction, (state, action) => {
    return state;
  }),
  on(genericErrorAction, (state, action) => {
    return { ...state, updateInProgress: false };
  }),
  on(updateTicketErrorAction, (state, action) => {
    return { ...state, updateInProgress: false };
  })
);

function updateNextId(arr: FullTicket[]): FullTicket[] {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].nextId = arr[i + 1] ? arr[i + 1].id : null;
  }
  return arr;
}
