import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRubricComponent } from './quiz-rubric.component';

describe('QuizRubricComponent', () => {
  let component: QuizRubricComponent;
  let fixture: ComponentFixture<QuizRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRubricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
