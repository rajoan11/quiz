import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCheckboxComponent } from './front-checkbox.component';

describe('FrontCheckboxComponent', () => {
  let component: FrontCheckboxComponent;
  let fixture: ComponentFixture<FrontCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
