import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraPanel } from './camera-panel';

describe('CameraPanel', () => {
  let component: CameraPanel;
  let fixture: ComponentFixture<CameraPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
