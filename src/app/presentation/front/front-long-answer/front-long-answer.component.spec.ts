import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLongAnswerComponent } from './front-long-answer.component';

describe('FrontLongAnswerComponent', () => {
  let component: FrontLongAnswerComponent;
  let fixture: ComponentFixture<FrontLongAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontLongAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontLongAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
