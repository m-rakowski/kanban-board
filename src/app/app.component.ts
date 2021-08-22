import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { randomTicket, Ticket, TicketStatus } from './models/ticket';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  TicketStatus = TicketStatus;

  constructor(
    private store: Store<Ticket>,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(loadAllTicketsAction());
    // this.ticketsService.getLastTicket(TicketStatus.TO_DO).subscribe();
  }

  add(ticketStatus: TicketStatus) {
    const ticket: Ticket = randomTicket(ticketStatus);
    this.ticketsService.addTicket(ticket).subscribe();
  }

  getAll(ticketStatus?: TicketStatus) {
    if (ticketStatus) {
      this.ticketsService.getAll(ticketStatus).subscribe(console.log);
    } else {
      this.ticketsService.getAll().subscribe(console.log);
    }
  }

  delete() {
    this.ticketsService
      .deleteTicket(TicketStatus.TO_DO, '9ab104a6-975e-4621-b254-de867d03ca7f')
      .subscribe();
  }
}
