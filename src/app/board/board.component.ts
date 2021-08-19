import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  ticketsToDo: Ticket[] = [
    {
      id: uuidv4(),
      content:
        '[backend] implement a backend API for saving and deleting tickets',
    },
    { id: uuidv4(), content: '[frontend] connect the board to the API' },
    { id: uuidv4(), content: '[frontend] modal for adding tickets' },
    { id: uuidv4(), content: '[frontend] X for deleting tickets' },
  ];

  ticketsToTest: Ticket[] = [];

  doneTickets: Ticket[] = [
    { id: uuidv4(), content: '[frontend] install redux' },
    { id: uuidv4(), content: '[frontend] create a drag-and-drop list' },
  ];

  drop(event: CdkDragDrop<Ticket[]>) {
    console.log(event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray<Ticket>(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem<Ticket>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  asTicket(ticket: Ticket): Ticket {
    return ticket;
  }
}
