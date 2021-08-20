import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket } from './models/ticket';
import { addTicketAction } from './customer/store/action/ticket.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<Ticket>, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Ticket[]>('/api/toDo').subscribe((tickets) => {
      tickets.forEach((ticket) => {
        this.store.dispatch(
          addTicketAction({
            ticket: ticket,
          })
        );
      });
    });
    this.httpClient.get<Ticket[]>('/api/toTest').subscribe((tickets) => {
      tickets.forEach((ticket) => {
        this.store.dispatch(
          addTicketAction({
            ticket: ticket,
          })
        );
      });
    });
    this.httpClient.get<Ticket[]>('/api/done').subscribe((tickets) => {
      tickets.forEach((ticket) => {
        this.store.dispatch(
          addTicketAction({
            ticket: ticket,
          })
        );
      });
    });
  }
}
