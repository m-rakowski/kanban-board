import { initialState, ticketsReducers, TicketsState } from './ticket.reducers';
import { TicketStatus } from '../../models/ticket';
import { moveItemAction } from '../actions/ticket.actions';

describe('unknown action', () => {
  it('should return the default state', () => {
    const action = {
      type: 'uydjhdfdhalkjfha',
    };

    const state = ticketsReducers(initialState, action);

    expect(state).toBe(initialState);
  });
});
describe('moveItemAction', () => {
  it('should make sure that when the action is dispatched a reducer catches it and reconfigures the state', () => {
    const initialState: TicketsState = {
      toDo: [
        {
          title: '0',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
          nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
          previousId: 'FIRST',
        },
        {
          title: '1',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
          nextId: '31da9a19-dc1b-4992-91b7-04e051a41148',
          previousId: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
        },
        {
          title: '2',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '31da9a19-dc1b-4992-91b7-04e051a41148',
          nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
          previousId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
        },
        {
          title: '3',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '77b22676-7463-4135-ba63-f85251a4f42a',
          nextId: 'LAST',
          previousId: '31da9a19-dc1b-4992-91b7-04e051a41148',
        },
      ],
      toTest: [],
      done: [],
      updateInProgress: false,
    };
    const newState: TicketsState = {
      toDo: [
        {
          title: '2',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '31da9a19-dc1b-4992-91b7-04e051a41148',
          nextId: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
          previousId: 'FIRST',
        },
        {
          title: '0',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
          nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
          previousId: '31da9a19-dc1b-4992-91b7-04e051a41148',
        },
        {
          title: '1',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
          nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
          previousId: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
        },
        {
          title: '3',
          content: 'null',
          status: TicketStatus.TO_DO,
          id: '77b22676-7463-4135-ba63-f85251a4f42a',
          nextId: 'LAST',
          previousId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
        },
      ],
      toTest: [],
      done: [],
      updateInProgress: false,
    };

    const props: any = {
      what: {
        title: '2',
        content: 'null',
        status: TicketStatus.TO_DO,
        id: '31da9a19-dc1b-4992-91b7-04e051a41148',
        nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
        previousId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
      },
      whereFrom: { listName: 'toDo', elementIndex: 2 },
      whereTo: { listName: 'toDo', elementIndex: 0 },
    };

    const action = moveItemAction(props);
    const state = ticketsReducers(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
