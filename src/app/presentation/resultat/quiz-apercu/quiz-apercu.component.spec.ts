import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizApercuComponent } from './quiz-apercu.component';

describe('QuizApercuComponent', () => {
  let component: QuizApercuComponent;
  let fixture: ComponentFixture<QuizApercuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizApercuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
