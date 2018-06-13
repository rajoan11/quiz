import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontMultipleChoiceComponent } from './front-multiple-choice.component';

describe('FrontMultipleChoiceComponent', () => {
  let component: FrontMultipleChoiceComponent;
  let fixture: ComponentFixture<FrontMultipleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontMultipleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
