import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRubricComponent } from './content-rubric.component';

describe('ContentRubricComponent', () => {
  let component: ContentRubricComponent;
  let fixture: ComponentFixture<ContentRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRubricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
