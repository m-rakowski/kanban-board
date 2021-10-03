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
    const movedTicket =
      this.allTickets[event.previousContainer.id as 'toDo' | 'toTest' | 'done'][
        event.previousIndex
      ];

    if (event.container.id === event.previousContainer.id) {
      let copy = JSON.parse(
        JSON.stringify(
          this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done']
        )
      );
      moveItemInArray(copy, event.previousIndex, event.currentIndex);
      this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done'] = copy;
    } else {
      let copyFrom = JSON.parse(
        JSON.stringify(
          this.allTickets[
            event.previousContainer.id as 'toDo' | 'toTest' | 'done'
          ]
        )
      );
      let copyTo = JSON.parse(
        JSON.stringify(
          this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done']
        )
      );
      transferArrayItem(
        copyFrom,
        copyTo,
        event.previousIndex,
        event.currentIndex
      );
      this.allTickets[
        event.previousContainer.id as 'toDo' | 'toTest' | 'done'
      ] = copyFrom;
      this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done'] =
        copyTo;
    }

    const beforeThisOne =
      this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done'][
        event.currentIndex + 1
      ];
    const afterThisOne =
      this.allTickets[event.container.id as 'toDo' | 'toTest' | 'done'][
        event.currentIndex - 1
      ];

    let fromListStatus: TicketStatus = event.previousContainer
      .id as TicketStatus;
    let toListStatus: TicketStatus = event.container.id as TicketStatus;

    const moveRequest: MoveRequest = {
      movedTicket,
      afterThisOne,
      beforeThisOne,
      fromListStatus,
      toListStatus,
    };
    console.log(moveRequest);
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
