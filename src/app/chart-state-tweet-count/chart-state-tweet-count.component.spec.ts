import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStateTweetCountComponent } from './chart-state-tweet-count.component';

describe('ChartStateTweetCountComponent', () => {
  let component: ChartStateTweetCountComponent;
  let fixture: ComponentFixture<ChartStateTweetCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStateTweetCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStateTweetCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
