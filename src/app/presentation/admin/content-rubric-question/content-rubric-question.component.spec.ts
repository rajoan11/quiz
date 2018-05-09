import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRubricQuestionComponent } from './content-rubric-question.component';

describe('ContentRubricQuestionComponent', () => {
  let component: ContentRubricQuestionComponent;
  let fixture: ComponentFixture<ContentRubricQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRubricQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRubricQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
