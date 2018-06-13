import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontListScrollComponent } from './front-list-scroll.component';

describe('FrontListScrollComponent', () => {
  let component: FrontListScrollComponent;
  let fixture: ComponentFixture<FrontListScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontListScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontListScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
