import { Component, Input } from '@angular/core';
import { Ticket, TicketStatus } from '../models/ticket';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  addTicketAction,
  moveItemAction,
} from '../store/actions/ticket.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../board/board.component';
import { AddEditTicketDialogComponent } from '../add-edit-ticket-dialog/add-edit-ticket-dialog.component';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.scss'],
})
export class SwimlaneComponent {
  @Input() title = '';
  @Input() id = '';
  @Input() status: TicketStatus = TicketStatus.DONE;
  @Input() tickets: Ticket[] = [];

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

  addTicket(ticketStatus: TicketStatus) {
    const dialogRef = this.dialog.open(AddEditTicketDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((ticket) => {
      if (ticket) {
        ticket.status = ticketStatus;
        this.saveTicket(ticket);
      }
    });
  }

  editTicket(ticket: Ticket) {
    const dialogRef = this.dialog.open(AddEditTicketDialogComponent, {
      width: '250px',
      data: { ticket: ticket },
    });

    dialogRef.afterClosed().subscribe((ticket) => {
      if (ticket) {
        this.saveTicket(ticket);
      }
    });
  }

  private saveTicket(ticket: Ticket) {
    this.store.dispatch(addTicketAction({ ticket }));
  }
}
