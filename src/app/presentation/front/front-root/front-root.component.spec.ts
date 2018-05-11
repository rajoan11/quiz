import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontRootComponent } from './front-root.component';

describe('FrontRootComponent', () => {
  let component: FrontRootComponent;
  let fixture: ComponentFixture<FrontRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
