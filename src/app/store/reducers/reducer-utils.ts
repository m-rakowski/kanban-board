import { FullTicket } from '../../models/ticket';

export function sorted(tickets: FullTicket[]) {
  const result: FullTicket[] = [];

  const copy: FullTicket[] = JSON.parse(JSON.stringify(tickets));

  const firstIndex = copy.findIndex((ticket) => ticket.previousId === 'FIRST');

  if (firstIndex > -1) {
    let curr: any = copy[firstIndex];

    while (curr && curr.nextId !== 'LAST') {
      result.push(curr);
      curr = copy.find((ticket) => ticket.id === curr.nextId);
    }
    result.push(curr);
  }
  return result;
}
