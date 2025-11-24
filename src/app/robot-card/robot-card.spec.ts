import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCard } from './robot-card';

describe('RobotCard', () => {
  let component: RobotCard;
  let fixture: ComponentFixture<RobotCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
