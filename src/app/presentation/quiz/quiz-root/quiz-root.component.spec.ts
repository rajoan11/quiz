import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRootComponent } from './quiz-root.component';

describe('QuizRootComponent', () => {
  let component: QuizRootComponent;
  let fixture: ComponentFixture<QuizRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
