import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorGraphs } from './sensor-graphs';

describe('SensorGraphs', () => {
  let component: SensorGraphs;
  let fixture: ComponentFixture<SensorGraphs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorGraphs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorGraphs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
