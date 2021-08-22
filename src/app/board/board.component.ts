import { Component, OnDestroy, OnInit } from '@angular/core';
import { FullTicket, TicketStatus } from '../models/ticket';
import { Store } from '@ngrx/store';
import { TicketsState } from '../store/reducers/ticket.reducers';
import {
  selectDoneTickets,
  selectTicketsToDo,
  selectTicketsToTest,
} from '../store/selectors/ticket.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface AppState {
  ticketsFeature: TicketsState;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  TicketStatus = TicketStatus;
  doneTickets: FullTicket[] = [];
  ticketsToTest: FullTicket[] = [];
  ticketsToDo: FullTicket[] = [];
  private onDestroySubject = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectDoneTickets)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.doneTickets = tickets));
    this.store
      .select(selectTicketsToTest)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.ticketsToTest = tickets));
    this.store
      .select(selectTicketsToDo)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.ticketsToDo = tickets));
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next();
  }
}
