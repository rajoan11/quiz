import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontTextComponent } from './front-text.component';

describe('FrontTextComponent', () => {
  let component: FrontTextComponent;
  let fixture: ComponentFixture<FrontTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
