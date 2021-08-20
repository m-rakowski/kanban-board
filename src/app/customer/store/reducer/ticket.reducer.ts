import { createReducer, on } from '@ngrx/store';
import { Ticket, TicketStatus } from '../../../models/ticket';
import { addTicketAction, moveItemAction } from '../action/ticket.actions';
import { v4 as uuidv4 } from 'uuid';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export const initialState: TicketsState = {
  toDo: [],
  toTest: [],
  done: [],
};

export interface TicketsState {
  toDo: Ticket[];
  toTest: Ticket[];
  done: Ticket[];
}

function addIdToTicket(ticket: Ticket) {
  return { ...ticket, id: uuidv4() };
}

function getListFromId(listName: string, state: TicketsState): Ticket[] {
  switch (listName) {
    case 'toDo':
      return state.toDo;
    case 'toTest':
      return state.toTest;
    case 'done':
      return state.done;
    default:
      return state.toDo;
  }
}

export const ticketsReducers = createReducer<TicketsState>(
  initialState,
  on(addTicketAction, (state, action) => {
    if (action.ticket.status === TicketStatus.TO_DO) {
      return {
        ...state,
        toDo: [...state.toDo, addIdToTicket(action.ticket)],
      };
    } else if (action.ticket.status === TicketStatus.TO_TEST) {
      return {
        ...state,
        toDo: [...state.toTest, addIdToTicket(action.ticket)],
      };
    } else if (action.ticket.status === TicketStatus.DONE) {
      return {
        ...state,
        done: [...state.done, addIdToTicket(action.ticket)],
      };
    } else
      return {
        ...state,
      };
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
