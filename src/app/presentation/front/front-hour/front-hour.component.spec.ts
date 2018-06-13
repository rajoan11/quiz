import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontHourComponent } from './front-hour.component';

describe('FrontHourComponent', () => {
  let component: FrontHourComponent;
  let fixture: ComponentFixture<FrontHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
