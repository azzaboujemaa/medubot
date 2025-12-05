import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPanelComponent } from './sensors-panel';

describe('SensorsPanel', () => {
  let component: SensorsPanelComponent;
  let fixture: ComponentFixture<SensorsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
