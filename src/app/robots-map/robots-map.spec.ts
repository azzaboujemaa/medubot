import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotsMap } from './robots-map';

describe('RobotsMap', () => {
  let component: RobotsMap;
  let fixture: ComponentFixture<RobotsMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotsMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotsMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
