import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullTicket, Ticket, TicketStatus } from '../models/ticket';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  addTicketAction,
  deleteTicketAction,
  updateTicketAction,
} from '../store/actions/ticket.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../board/board.component';
import { AddEditTicketDialogComponent } from '../add-edit-ticket-dialog/add-edit-ticket-dialog.component';
import { selectIsUpdateInProgress } from '../store/selectors/ticket.selectors';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.scss'],
})
export class SwimlaneComponent implements OnInit {
  @Input() title = '';
  @Input() id = '';
  @Input() status: TicketStatus = TicketStatus.done;
  @Input() tickets: FullTicket[] = [];

  isUpdateInProgress$ = this.store.select(selectIsUpdateInProgress);
  @Output() dropEventEmitter = new EventEmitter<CdkDragDrop<FullTicket[]>>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {}

  asTicket(ticket: FullTicket): FullTicket {
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

  edit(ticket: FullTicket) {
    const dialogRef = this.dialog.open(AddEditTicketDialogComponent, {
      width: '250px',
      data: { ticket: ticket },
    });

    dialogRef.afterClosed().subscribe((partialTicketFromDialog) => {
      if (partialTicketFromDialog) {
        this.updateTicket({ ...ticket, ...partialTicketFromDialog });
      }
    });
  }

  delete(ticket: FullTicket) {
    this.store.dispatch(deleteTicketAction({ ticket }));
  }

  private saveTicket(ticket: Ticket) {
    this.store.dispatch(addTicketAction({ ticket }));
  }

  private updateTicket(ticket: FullTicket) {
    this.store.dispatch(updateTicketAction({ ticket }));
  }

  drop(event: CdkDragDrop<FullTicket[]>) {
    this.dropEventEmitter.next(event);
  }
}
