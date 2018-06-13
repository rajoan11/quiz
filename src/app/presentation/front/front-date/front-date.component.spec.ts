import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDateComponent } from './front-date.component';

describe('FrontDateComponent', () => {
  let component: FrontDateComponent;
  let fixture: ComponentFixture<FrontDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
