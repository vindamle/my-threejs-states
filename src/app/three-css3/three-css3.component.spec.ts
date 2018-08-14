import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCss3Component } from './three-css3.component';

describe('ThreeCss3Component', () => {
  let component: ThreeCss3Component;
  let fixture: ComponentFixture<ThreeCss3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeCss3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeCss3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
