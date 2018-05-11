import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatRootComponent } from './resultat-root.component';

describe('ResultatRootComponent', () => {
  let component: ResultatRootComponent;
  let fixture: ComponentFixture<ResultatRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
