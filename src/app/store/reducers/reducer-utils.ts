import { FullTicket } from '../../models/ticket';

export function sorted(tickets: FullTicket[]) {
  const sortedArray = [];

  let current = tickets.find((ticket) => ticket.nextId === null);

  while (current) {
    sortedArray.push(current);
    if (current) {
      current = tickets.find((ticket) => ticket.nextId === current?.id);
    } else {
      throw new Error('found a gap in the linked list of tickets');
    }
  }

  return sortedArray.reverse();
}
