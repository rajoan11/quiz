import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontVideoComponent } from './front-video.component';

describe('FrontVideoComponent', () => {
  let component: FrontVideoComponent;
  let fixture: ComponentFixture<FrontVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
