import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontShortAnswerComponent } from './front-short-answer.component';

describe('FrontShortAnswerComponent', () => {
  let component: FrontShortAnswerComponent;
  let fixture: ComponentFixture<FrontShortAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontShortAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontShortAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
