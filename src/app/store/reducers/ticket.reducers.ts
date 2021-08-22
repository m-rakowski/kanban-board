import { createReducer, on } from '@ngrx/store';
import { FullTicket, TicketStatus } from '../../models/ticket';
import {
  addTicketAction,
  addTicketSuccessAction,
  deleteTicketAction,
  loadAllTicketsSuccessAction,
  moveItemAction,
  updateTicketAction,
  updateTicketSuccessAction,
} from '../actions/ticket.actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export const initialState: TicketsState = {
  toDo: [],
  toTest: [],
  done: [],
};

export interface TicketsState {
  toDo: FullTicket[];
  toTest: FullTicket[];
  done: FullTicket[];
}

export const ticketsReducers = createReducer<TicketsState>(
  initialState,
  on(addTicketAction, (state, action) => {
    return {
      ...state,
      [action.ticket.status]: [...state[action.ticket.status], action.ticket],
    };
  }),
  on(addTicketSuccessAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex(
      (ticket) => ticket.id === action.ticket.id
    );

    copy.splice(foundIndex, 1, action.ticket);

    return {
      ...state,
      [action.ticket.status]: copy,
    };
  }),
  on(updateTicketAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex(
      (ticket) => ticket.id === action.ticket.id
    );

    if (foundIndex > -1) {
      copy[foundIndex] = action.ticket;
      return { ...state, [action.ticket.status]: copy };
    } else {
      return { ...state };
    }
  }),
  on(updateTicketSuccessAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex(
      (ticket) => ticket.id === action.ticket.id
    );

    copy.splice(foundIndex, 1, action.ticket);

    return {
      ...state,
      [action.ticket.status]: copy,
    };
  }),
  on(loadAllTicketsSuccessAction, (state, action) => {
    return {
      ...state,
      toDo: action.tickets.filter(
        (ticket) => ticket.status === TicketStatus.TO_DO
      ),
      toTest: action.tickets.filter(
        (ticket) => ticket.status === TicketStatus.TO_TEST
      ),
      done: action.tickets.filter(
        (ticket) => ticket.status === TicketStatus.DONE
      ),
    };
  }),
  on(deleteTicketAction, (state, action) => {
    const copy: FullTicket[] = JSON.parse(
      JSON.stringify(state[action.ticket.status])
    );
    const foundIndex = copy.findIndex((el) => el.id === action.ticket.id);
    copy.splice(foundIndex, 1);
    return { ...state, [action.ticket.status]: copy };
  }),
  on(moveItemAction, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    if (action.whereTo.listName === action.whereFrom.listName) {
      moveItemInArray(
        newState[action.whereTo.listName],
        action.whereFrom.elementIndex,
        action.whereTo.elementIndex
      );
    } else {
      transferArrayItem(
        newState[action.whereFrom.listName],
        newState[action.whereTo.listName],
        action.whereFrom.elementIndex,
        action.whereTo.elementIndex
      );
    }
    return newState;
  })
);
