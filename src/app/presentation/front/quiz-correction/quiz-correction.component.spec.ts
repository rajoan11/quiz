import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCorrectionComponent } from './quiz-correction.component';

describe('QuizCorrectionComponent', () => {
  let component: QuizCorrectionComponent;
  let fixture: ComponentFixture<QuizCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
