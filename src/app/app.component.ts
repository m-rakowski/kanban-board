import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket, TicketStatus } from './models/ticket';
import {
  loadAllTicketsAction,
  resetDbAction,
} from './store/actions/ticket.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  TicketStatus = TicketStatus;

  constructor(private store: Store<Ticket>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllTicketsAction());
  }

  reset() {
    this.store.dispatch(resetDbAction());
  }
}
