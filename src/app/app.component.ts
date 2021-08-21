import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket } from './models/ticket';
import { loadAllTicketsAction } from './store/actions/ticket.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<Ticket>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllTicketsAction());
  }
}
