import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGeotagComponent } from './chart-geotag.component';

describe('ChartGeotagComponent', () => {
  let component: ChartGeotagComponent;
  let fixture: ComponentFixture<ChartGeotagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartGeotagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGeotagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
