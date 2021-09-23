import { DbModel } from './models/db-model';
import { TicketStatus } from './models/ticket';

export const db: DbModel = {
  toDo: [
    {
      title: '0',
      content: 'null',
      status: TicketStatus.TO_DO,
      id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
      nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
      previousId: null,
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
      nextId: null,
      previousId: '31da9a19-dc1b-4992-91b7-04e051a41148',
    },
  ],
  toTest: [],
  done: [],
};
