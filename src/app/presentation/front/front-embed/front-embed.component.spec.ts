import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEmbedComponent } from './front-embed.component';

describe('FrontEmbedComponent', () => {
  let component: FrontEmbedComponent;
  let fixture: ComponentFixture<FrontEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
