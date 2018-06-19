import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzCorrectionQuestionComponent } from './quizz-correction-question.component';

describe('QuizzCorrectionQuestionComponent', () => {
  let component: QuizzCorrectionQuestionComponent;
  let fixture: ComponentFixture<QuizzCorrectionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzCorrectionQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzCorrectionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
