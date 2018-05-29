import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzResponseComponent } from './quizz-response.component';

describe('QuizzResponseComponent', () => {
  let component: QuizzResponseComponent;
  let fixture: ComponentFixture<QuizzResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
