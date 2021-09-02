import { createReducer, on } from '@ngrx/store';
import { FullTicket, TicketStatus } from '../../models/ticket';
import {
  addTicketAction,
  addTicketSuccessAction,
  deleteTicketAction,
  deleteTicketSuccessAction,
  loadAllTicketsSuccessAction,
  moveItemAction,
  resetDbSuccessAction,
  updateTicketAction,
  updateTicketSuccessAction,
} from '../actions/ticket.actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { db } from '../../sample.db';
import { sorted } from './reducer-utils';

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
      [action.ticket.status]: [...state[action.ticket.status], action.ticket],
      updateInProgress: true,
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
      updateInProgress: false,
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
      return { ...state, updateInProgress: true, [action.ticket.status]: copy };
    } else {
      return { ...state, updateInProgress: true };
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
      updateInProgress: false,
    };
  }),
  on(loadAllTicketsSuccessAction, (state, action) => {
    return {
      ...state,
      toDo: sorted(
        action.tickets.filter((ticket) => ticket.status === TicketStatus.TO_DO)
      ),
      toTest: sorted(
        action.tickets.filter(
          (ticket) => ticket.status === TicketStatus.TO_TEST
        )
      ),
      done: sorted(
        action.tickets.filter((ticket) => ticket.status === TicketStatus.DONE)
      ),
    };
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
  on(moveItemAction, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    if (action.whereTo.listName === action.whereFrom.listName) {
      moveItemInArray(
        newState[action.whereTo.listName],
        action.whereFrom.elementIndex,
        action.whereTo.elementIndex
      );
      newState[action.whereTo.listName] = updatePreviousAndNext(
        newState[action.whereTo.listName]
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

function updatePreviousAndNext(arr: FullTicket[]): FullTicket[] {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].previousId = arr[i - 1] ? arr[i - 1].id : 'FIRST';
    arr[i].nextId = arr[i + 1] ? arr[i + 1].id : 'LAST';
  }
  return arr;
}
