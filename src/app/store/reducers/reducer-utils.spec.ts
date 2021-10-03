import { FullTicket, TicketStatus } from '../../models/ticket';
import { sorted } from './reducer-utils';

describe('sorted', () => {
  it('should sort an empty list', () => {
    const unsortedList: FullTicket[] = [];
    const sortedList: FullTicket[] = [];
    expect(sorted(unsortedList)).toEqual(sortedList);
  });

  it('should sort when list contains multiple elements', () => {
    const unsortedList: FullTicket[] = [
      {
        title: '0',
        content: 'null',
        status: TicketStatus.toDo,
        id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
        nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
      },
      {
        title: '3',
        content: 'null',
        status: TicketStatus.toDo,
        id: '77b22676-7463-4135-ba63-f85251a4f42a',
        nextId: null,
      },
      {
        title: '1',
        content: 'null',
        status: TicketStatus.toDo,
        id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
        nextId: '31da9a19-dc1b-4992-91b7-04e051a41148',
      },
      {
        title: '2',
        content: 'null',
        status: TicketStatus.toDo,
        id: '31da9a19-dc1b-4992-91b7-04e051a41148',
        nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
      },
    ];
    const sortedList: FullTicket[] = [
      {
        title: '0',
        content: 'null',
        status: TicketStatus.toDo,
        id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
        nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
      },
      {
        title: '1',
        content: 'null',
        status: TicketStatus.toDo,
        id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
        nextId: '31da9a19-dc1b-4992-91b7-04e051a41148',
      },
      {
        title: '2',
        content: 'null',
        status: TicketStatus.toDo,
        id: '31da9a19-dc1b-4992-91b7-04e051a41148',
        nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
      },
      {
        title: '3',
        content: 'null',
        status: TicketStatus.toDo,
        id: '77b22676-7463-4135-ba63-f85251a4f42a',
        nextId: null,
      },
    ];

    expect(sorted(unsortedList)).toEqual(sortedList);
  });
});
