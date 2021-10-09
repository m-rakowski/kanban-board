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
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { moveAction } from '../store/actions/ticket.actions';
import { MoveRequest } from '../models/move-request';

export interface AppState {
  ticketsFeature: TicketsState;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  allTickets: {
    toDo: FullTicket[];
    toTest: FullTicket[];
    done: FullTicket[];
  } = {
    toDo: [],
    toTest: [],
    done: [],
  };
  TicketStatus = TicketStatus;
  private onDestroySubject = new Subject();

  constructor(private store: Store<AppState>) {}

  drop(event: CdkDragDrop<FullTicket[]>) {
    const eventContainerId = event.container.id as 'toDo' | 'toTest' | 'done';
    const eventPreviousContainerId = event.previousContainer.id as
      | 'toDo'
      | 'toTest'
      | 'done';

    const movedTicket: FullTicket = event.item.data;

    if (event.container.id === event.previousContainer.id) {
      const copy = JSON.parse(JSON.stringify(event.container.data));
      moveItemInArray(copy, event.previousIndex, event.currentIndex);
      this.allTickets[eventContainerId] = copy;
    } else {
      const previousContainerDataCopy = JSON.parse(
        JSON.stringify(event.previousContainer.data)
      );
      const containerDataCopy = JSON.parse(
        JSON.stringify(event.container.data)
      );

      transferArrayItem(
        previousContainerDataCopy,
        containerDataCopy,
        event.previousIndex,
        event.currentIndex
      );
      this.allTickets[eventPreviousContainerId] = previousContainerDataCopy;
      this.allTickets[eventContainerId] = containerDataCopy;
    }

    const afterThisOne =
      this.allTickets[eventContainerId][event.currentIndex - 1] ??
      this.allTickets[eventContainerId][0];

    const moveRequest: MoveRequest = {
      movedTicketId: movedTicket.id,
      afterThisOneId: afterThisOne.id,
    };
    this.store.dispatch(
      moveAction({
        moveRequest,
      })
    );
  }

  ngOnInit(): void {
    this.store
      .select(selectDoneTickets)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.allTickets.done = tickets));
    this.store
      .select(selectTicketsToTest)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.allTickets.toTest = tickets));
    this.store
      .select(selectTicketsToDo)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((tickets) => (this.allTickets.toDo = tickets));
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next();
  }
}
