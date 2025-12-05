import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEvents } from './system-events';

describe('SystemEvents', () => {
  let component: SystemEvents;
  let fixture: ComponentFixture<SystemEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
