import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket, TicketStatus } from './models/ticket';
import { addTicketAction } from './customer/store/action/ticket.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<Ticket>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title:
              '[backend] implement a backend API for saving and deleting tickets',
            content: '',
            status: TicketStatus.TO_DO,
          },
        })
      );
      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[backend] install app on firebase',
            content: '',
            status: TicketStatus.TO_DO,
          },
        })
      );

      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[frontend] connect the board to the API',
            content: '',
            status: TicketStatus.TO_DO,
          },
        })
      );
      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[frontend] modal for adding tickets',
            content: '',
            status: TicketStatus.TO_DO,
          },
        })
      );
      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[frontend] X for deleting tickets',
            content: '',
            status: TicketStatus.TO_DO,
          },
        })
      );

      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[frontend] install redux',
            content: '',
            status: TicketStatus.DONE,
          },
        })
      );

      this.store.dispatch(
        addTicketAction({
          ticket: {
            id: uuidv4(),
            title: '[frontend] create a drag-and-drop list',
            content: '',
            status: TicketStatus.DONE,
          },
        })
      );
    }, 100);
  }
}
