import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLinearScalComponent } from './front-linear-scal.component';

describe('FrontLinearScalComponent', () => {
  let component: FrontLinearScalComponent;
  let fixture: ComponentFixture<FrontLinearScalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontLinearScalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontLinearScalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
