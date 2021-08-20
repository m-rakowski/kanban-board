import { Component, OnDestroy, OnInit } from '@angular/core';

import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Ticket, TicketStatus } from '../models/ticket';
import { AddEditTicketDialogComponent } from '../add-edit-ticket-dialog/add-edit-ticket-dialog.component';
import {
  addTicketAction,
  moveItemAction,
} from '../customer/store/action/ticket.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TicketsState } from '../customer/store/reducer/ticket.reducer';
import {
  selectDoneTickets,
  selectTicketsToDo,
  selectTicketsToTest,
} from '../customer/store/selectors/tickets.selector';
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

  private getTicketStatusFromId(
    previousContainer: CdkDropList<Ticket[]>
  ): TicketStatus {
    switch (previousContainer.id) {
      case 'toDo':
        return TicketStatus.TO_DO;
      case 'toTest':
        return TicketStatus.TO_TEST;
      case 'done':
        return TicketStatus.DONE;
      default:
        return TicketStatus.TO_TEST;
    }
  }

  doneTickets: Ticket[] = [];
  ticketsToTest: Ticket[] = [];
  ticketsToDo: Ticket[] = [];

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  drop(event: CdkDragDrop<Ticket[]>) {
    this.store.dispatch(
      moveItemAction({
        what: event.item.data,
        whereTo: {
          listName: event.container.id,
          elementIndex: event.currentIndex,
        },
        whereFrom: {
          listName: event.previousContainer.id,
          elementIndex: event.previousIndex,
        },
      })
    );
  }

  asTicket(ticket: Ticket): Ticket {
    return ticket;
  }

  addTicket() {
    const dialogRef = this.dialog.open(AddEditTicketDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((ticket: { ticket: Ticket }) => {
      this.saveTicket(ticket.ticket);
    });
  }

  private saveTicket(ticket: Ticket) {
    this.store.dispatch(addTicketAction({ ticket }));
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next();
  }
}
