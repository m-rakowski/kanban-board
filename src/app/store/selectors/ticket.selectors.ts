import { AppState } from '../../board/board.component';

export const selectDoneTickets = (state: AppState) => state.ticketsFeature.done;
export const selectTicketsToDo = (state: AppState) => state.ticketsFeature.toDo;
export const selectTicketsToTest = (state: AppState) =>
  state.ticketsFeature.toTest;
