import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPanel } from './weather-panel';

describe('WeatherPanel', () => {
  let component: WeatherPanel;
  let fixture: ComponentFixture<WeatherPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
