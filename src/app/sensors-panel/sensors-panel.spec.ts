import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPanel } from './sensors-panel';

describe('SensorsPanel', () => {
  let component: SensorsPanel;
  let fixture: ComponentFixture<SensorsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorsPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
