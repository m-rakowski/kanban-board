import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TicketEffects } from './ticket.effects';
import { TicketStatus } from '../../models/ticket';
import { cold, hot } from 'jasmine-marbles';
import { TicketsService } from '../../services/tickets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { moveAction } from '../actions/ticket.actions';

describe('TicketEffects', () => {
  let effects: TicketEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TicketEffects,
        provideMockActions(() => actions),
        {
          provide: TicketsService,
          useValue: {
            moveTicket: () => of({}),
          },
        },
        // other providers
      ],
    });

    effects = TestBed.inject(TicketEffects);
  });

  // it('make sure that an effect catches the moveAction and that DBService.moveItem is triggered', () => {
  //   const dispatchedAction = moveAction({
  //     what: {
  //       title: '1',
  //       content: 'null',
  //       status: TicketStatus.toDo,
  //       id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
  //       nextId: '31da9a19-dc1b-4992-91b7-04e051a41148',
  //     },
  //     whereTo: {
  //       listName: 'toTest',
  //       elementIndex: 0,
  //     },
  //     whereFrom: {
  //       listName: 'toDo',
  //       elementIndex: 0,
  //     },
  //   });
  //
  //   actions = hot('a', { a: dispatchedAction });
  //
  //   expect(effects.moveItem$).toBeObservable(
  //     cold('a', { a: moveItemSuccessAction() })
  //   );
  // });
});
