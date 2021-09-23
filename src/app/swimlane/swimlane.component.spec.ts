import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwimlaneComponent } from './swimlane.component';
import { materialModules } from '../app.module';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Store } from '@ngrx/store';

describe('SwimlaneComponent', () => {
  let component: SwimlaneComponent;
  let fixture: ComponentFixture<SwimlaneComponent>;
  let storeMock: any;

  let loader: HarnessLoader;
  let theButton: MatButtonHarness;

  beforeEach(async () => {
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select'),
    };

    await TestBed.configureTestingModule({
      declarations: [SwimlaneComponent],
      imports: [materialModules],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SwimlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
    theButton = await loader.getHarness(MatButtonHarness.with({ text: '+' }));
  });
});
