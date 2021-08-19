import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket } from './models/ticket';
import { addTicket } from './customer/store/action/ticket.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<Ticket>) {}

  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.store.subscribe((abc) => console.log(abc));
  }

  add() {
    const ticket: Ticket = { id: uuidv4(), content: 'do this and that' };
    this.store.dispatch(addTicket({ ticket }));
  }
}
