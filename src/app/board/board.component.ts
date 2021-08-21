import { Component, OnDestroy, OnInit } from '@angular/core';

import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Ticket, TicketStatus } from '../models/ticket';
import { AddEditTicketDialogComponent } from '../add-edit-ticket-dialog/add-edit-ticket-dialog.component';
import {
  addTicketAction,
  moveItemAction,
} from '../store/actions/ticket.actions';
import { MatDialog } from '@angular/material/dialog';
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
  private onDestroySubject = new Subject();

  TicketStatus = TicketStatus;

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

  doneTickets: Ticket[] = [];
  ticketsToTest: Ticket[] = [];
  ticketsToDo: Ticket[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.onDestroySubject.next();
  }
}
